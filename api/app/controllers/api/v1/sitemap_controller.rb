# frozen_string_literal: true

module Api
  module V1
    class SitemapController < BaseController
      def index
        @listings = Listing.all.order(updated_at: :desc)
        @blog_posts = BlogPost.visible.order(updated_at: :desc)
        @listing_complexes = ListingComplex.visible.order(updated_at: :desc)
        @club_stories = ClubStory.visible.order(updated_at: :desc)

        respond_to do |format|
          format.xml { render template: 'api/v1/sitemap/index', content_type: 'application/xml' }
        end
      end
    end
  end
end
