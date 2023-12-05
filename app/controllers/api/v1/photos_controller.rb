# frozen_string_literal: true

module Api
  module V1
    class PhotosController < ApplicationController
      def index
        listings = Listing.all
        @photos = Listing.random_photos(listings, 3)
        render json: @photos
      end
    end
  end
end
