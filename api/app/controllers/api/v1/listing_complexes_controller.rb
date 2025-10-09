# frozen_string_literal: true

module Api
  module V1
    class ListingComplexesController < Api::V1::BaseController
      include FeatureFlag
      include Previewable

      before_action -> { require_feature!(:listing_complexes) }

      def index
        listing_complexes = ListingComplex.includes(:translations, :photos).where(hidden: false)
        paginated = paginate(listing_complexes, serializer: ListingComplexSerializer)

        render json: {
          listing_complexes: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @listing_complex = ListingComplex.includes(:translations, :listings, :photos).friendly.find(params[:id])

        # Allow preview mode to bypass hidden check
        if @listing_complex.hidden? && !current_admin&.confirmed? && !preview_mode?
          render json: { error: 'Not found' }, status: :not_found
          return
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
