# frozen_string_literal: true

module Api
  module V1
    class BlogPhotosController < ApplicationController
      def create
        return render json: { error: 'No file provided' }, status: :bad_request if params[:file].blank?
        return render json: { error: 'Invalid file type' }, status: :bad_request unless params[:file].is_a?(ActionDispatch::Http::UploadedFile)

        @image = BlogPhoto.new(image: params[:file], blog_post_id: params[:blog_post_id])

        if @image.save
          render json: { location: @image.image.url }, status: :created
        else
          render json: @image.errors.full_messages, status: :unprocessable_entity
        end
      end

      def destroy
        photo = BlogPhoto.find(params[:id])
        photo.destroy!

        render json: { message: 'Photo deleted successfully' }, status: :no_content
      end
    end
  end
end
