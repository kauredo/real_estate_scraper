# frozen_string_literal: true

module Api
  module V1
    class ListingComplexesController < ApplicationController
      include Pagy::Backend

      def index
        pagy, @listing_complexes = pagy(ListingComplex.includes(:listings, :photos).where(hidden: false))
        @listing_complexes_json = @listing_complexes.as_json(include: %i[listings photos], methods: :main_photo)
        @pagy = pagy_metadata(pagy)
        render json: { listing_complexes: @listing_complexes_json, pagy: @pagy }
      end

      def show
        @listing_complex = ListingComplex.includes(:listings, :photos).friendly.find(params[:id])
        @listing_complex_json = @listing_complex.as_json(include: %i[listings photos], methods: %i[main_photo listing_prices])

        render json: { listing_complex: @listing_complex_json }
      end
    end
  end
end
