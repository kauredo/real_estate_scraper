# frozen_string_literal: true

module Api
  module V1
    class ListingsController < ApplicationController
      include Pagy::Backend

      def index
        pagy, @listings = pagy(Listing.all)
        @pagy = pagy_metadata(pagy)
        render json: { listings: @listings, pagy: @pagy }
      end

      def show
        @listing = Listing.friendly.find(params[:id])
        render json: @listing
      end

      def by_geography
        @listings = Listing.by_geography
        render json: @listings
      end
    end
  end
end
