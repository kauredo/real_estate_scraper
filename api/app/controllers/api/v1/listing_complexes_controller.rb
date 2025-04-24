# frozen_string_literal: true

module Api
  module V1
    class ListingComplexesController < Api::V1::BaseController
      include Pagy::Backend

      def index
        listing_complexes = ListingComplex.includes(:listings, :photos).where(hidden: false)
        paginated = paginate(listing_complexes)

        render json: {
          listing_complexes: paginated[:data].map { |complex| ListingComplexSerializer.new(complex).as_json },
          pagination: paginated[:pagination]
        }
      end

      def show
        @listing_complex = ListingComplex.includes(:listings, :photos).friendly.find(params[:id])

        if @listing_complex.hidden? && !current_admin&.confirmed?
          render json: { error: 'Not found' }, status: :not_found
          return
        end

        render json: ListingComplexSerializer.new(@listing_complex, include_listings: true).as_json
      end
    end
  end
end
