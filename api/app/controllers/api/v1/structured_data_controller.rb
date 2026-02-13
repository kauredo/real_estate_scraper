# frozen_string_literal: true

module Api
  module V1
    class StructuredDataController < Api::V1::BaseController
      include Cacheable

      # GET /api/v1/structured_data/organization
      # Returns JSON-LD for Organization schema
      def organization
        # Cache for 24 hours - organization data rarely changes
        set_cache_headers(max_age: 24.hours)

        data = {
          '@context': 'https://schema.org',
          '@type': 'RealEstateAgent',
          name: Current.tenant&.name || 'Sofia Galvão Group',
          url: request.base_url,
          description: 'Premium real estate services in Portugal',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'PT'
          }
        }

        # Add optional fields if available
        data[:logo] = Current.tenant.logo_url if Current.tenant.respond_to?(:logo_url) && Current.tenant.logo_url.present?

        social_urls = []
        social_urls << Current.tenant.facebook_url if Current.tenant.respond_to?(:facebook_url) && Current.tenant.facebook_url.present?
        social_urls << Current.tenant.instagram_url if Current.tenant.respond_to?(:instagram_url) && Current.tenant.instagram_url.present?
        social_urls << Current.tenant.linkedin_url if Current.tenant.respond_to?(:linkedin_url) && Current.tenant.linkedin_url.present?
        data[:sameAs] = social_urls if social_urls.any?

        render json: data
      end

      # GET /api/v1/structured_data/listing/:id
      # Returns JSON-LD for a specific property listing
      def listing
        @listing = Listing.friendly.find(params[:id])

        # Cache based on listing update time
        fresh_when(
          etag: [@listing, Current.tenant],
          last_modified: @listing.updated_at,
          public: true
        )

        render json: {
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: @listing.title,
          description: @listing.description,
          url: "#{request.base_url}/listings/#{@listing.slug}",
          image: @listing.photos.first(5), # Up to 5 images for rich results
          datePosted: @listing.created_at.iso8601,
          dateModified: @listing.updated_at.iso8601,
          address: {
            '@type': 'PostalAddress',
            streetAddress: @listing.address,
            addressCountry: 'PT'
          },
          offers: {
            '@type': 'Offer',
            price: @listing.price_cents / 100.0,
            priceCurrency: 'EUR',
            availability: listing_availability(@listing),
            priceValidUntil: (Date.today + 30.days).iso8601
          },
          numberOfRooms: @listing.stats&.dig('Quartos'),
          numberOfBathroomsTotal: @listing.stats&.dig('Casas de Banho'),
          floorSize: {
            '@type': 'QuantitativeValue',
            value: @listing.stats&.dig('Área útil'),
            unitText: 'SQM'
          }.compact
        }.compact
      end

      # GET /api/v1/structured_data/breadcrumbs
      # Returns JSON-LD for breadcrumb navigation
      def breadcrumbs
        set_cache_headers(max_age: 1.hour)

        path = params[:path] || '/'
        breadcrumb_list = generate_breadcrumbs(path)

        render json: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb_list
        }
      end

      # GET /api/v1/structured_data/listings_collection
      # Returns JSON-LD for a collection of listings
      def listings_collection
        set_cache_headers(max_age: 5.minutes)

        listings = Listing.available.limit(20)

        render json: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: listings.map.with_index do |listing, index|
            {
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'RealEstateListing',
                name: listing.title,
                url: "#{request.base_url}/listings/#{listing.slug}",
                image: listing.photos.first,
                offers: {
                  '@type': 'Offer',
                  price: listing.price_cents / 100.0,
                  priceCurrency: 'EUR'
                }
              }
            }
          end
        }
      end

      # GET /api/v1/structured_data/blog_post/:id
      # Returns JSON-LD for a blog post (Article schema)
      def blog_post
        @blog_post = BlogPost.includes(:translations).friendly.find(params[:id])

        # Skip conditional GET headers in structured data responses
        # (they interfere with JSON-LD rendering)

        data = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: @blog_post.title,
          datePublished: @blog_post.created_at.iso8601,
          dateModified: @blog_post.updated_at.iso8601,
          author: {
            '@type': 'Organization',
            name: Current.tenant&.name || 'Sofia Galvão Group'
          },
          publisher: {
            '@type': 'Organization',
            name: Current.tenant&.name || 'Sofia Galvão Group'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': "#{request.base_url}/blog/#{@blog_post.slug}"
          }
        }

        # Add optional fields
        data[:description] = @blog_post.description if @blog_post.description.present?

        begin
          if @blog_post.respond_to?(:blog_photos) && @blog_post.blog_photos.loaded? && @blog_post.blog_photos.any?
            data[:image] = @blog_post.blog_photos.map(&:url)
          end
        rescue StandardError
          # Silently skip if blog_photos fails
        end

        if Current.tenant && Current.tenant.respond_to?(:logo_url) && Current.tenant.logo_url.present?
          data[:publisher][:logo] = {
            '@type': 'ImageObject',
            url: Current.tenant.logo_url
          }
        end

        render json: data
      end

      private

      def listing_availability(listing)
        case listing.status
        when 'recent', 'standard'
          'https://schema.org/InStock'
        when 'agreed'
          'https://schema.org/PreOrder'
        when 'sold', 'rented', 'closed'
          'https://schema.org/OutOfStock'
        else
          'https://schema.org/InStock'
        end
      end

      def generate_breadcrumbs(path)
        segments = path.split('/').reject(&:blank?)
        base_url = request.base_url

        breadcrumbs = [{
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: base_url
        }]

        current_path = ''
        segments.each_with_index do |segment, index|
          current_path += "/#{segment}"
          breadcrumbs << {
            '@type': 'ListItem',
            position: index + 2,
            name: segment.titleize,
            item: "#{base_url}#{current_path}"
          }
        end

        breadcrumbs
      end
    end
  end
end
