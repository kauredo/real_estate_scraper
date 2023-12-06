# frozen_string_literal: true

module Api
  module V1
    class ListingsController < ApplicationController
      include Pagy::Backend

      def index
        pagy, @listings = pagy(Listing.all)
        @pagy = pagy_metadata(pagy)
        render json: @listings
      end

      def show
        @listing = Listing.friendly.find(params[:id])
        @resource = {
          path: edit_backoffice_listing_path(@listing),
          name: I18n.t('listing.resource')
        }
        render json: @listing
      end

      def by_geography
        @listings = Listing.by_geography
        render json: @listings
      end
    end
  end
end
