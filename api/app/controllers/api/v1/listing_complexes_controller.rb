# frozen_string_literal: true

module Api
  module V1
    class ListingComplexesController < Api::V1::BaseController
      include Pagy::Backend

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

        if @listing_complex.hidden? && !current_admin&.confirmed?
          render json: { error: 'Not found' }, status: :not_found
          return
        end

        render json: @listing_complex,
               serializer: ListingComplexSerializer,
               include_listings: true
      end
    end
  end
end
