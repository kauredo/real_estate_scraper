# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class PhotosController < ApplicationController
        def destroy
          photo = Photo.find(params[:id])
          listing_complex = photo.listing_complex
          photo.destroy!
          listing_complex.reload.photos.map(&:save)
          render json: { message: 'Photo deleted successfully' }
        end
      end
    end
  end
end
