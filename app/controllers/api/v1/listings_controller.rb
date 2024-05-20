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
        listing = Listing.friendly.find(params[:id])
        statuses = Listing.statuses.map { |key, _value| [I18n.t("listing.status.#{key}"), key] }
        complexes = ListingComplex.all.map { |complex| [complex.name, complex.id] }
        render json: { listing:, statuses:, complexes: }
      end

      def by_geography
        @listings = Listing.by_geography
        render json: @listings
      end
    end
  end
end
