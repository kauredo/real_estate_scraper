# frozen_string_literal: true

module Api
  module V1
    class ListingComplexesController < Api::V1::BaseController
      include FeatureFlag
      include Previewable
      include Cacheable

      before_action -> { require_feature!(:listing_complexes) }

      def index
        # Set HTTP cache headers (5 minutes)
        set_cache_headers(max_age: 5.minutes)

        listing_complexes = ListingComplex.includes(:translations, :photos, :listings).where(hidden: false)
        paginated = paginate(listing_complexes, serializer: ListingComplexSerializer)

        render json: {
          listing_complexes: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        # First, find the record without eager loading to check if it's hidden
        @listing_complex = ListingComplex.friendly.find(params[:id])

        # Allow preview mode to bypass hidden check
        if @listing_complex.hidden? && !current_admin&.confirmed? && !preview_mode?
          render json: { error: 'Not found' }, status: :not_found
          return
        end

        # Now eager load associations since we know we'll need them
        @listing_complex = ListingComplex.includes(:translations, :listings, :photos).friendly.find(params[:id])

        # Set ETag and Last-Modified headers for conditional GET (skip in preview mode)
        unless preview_mode?
          fresh_when(
            etag: [@listing_complex, Current.tenant],
            last_modified: @listing_complex.updated_at,
            public: true
          )
        end

        render json: @listing_complex,
               serializer: ListingComplexSerializer,
               include_listings: true
      end

      private

      def controller_content_type
        'listing_complex'
      end
    end
  end
end
