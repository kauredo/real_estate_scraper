# frozen_string_literal: true

module Api
  module V1
    module Admin
      class BlogPhotosController < Api::V1::Admin::BaseController
        def create
          return render json: { error: 'No file provided' }, status: :bad_request if params[:file].blank?
          return render json: { error: 'Invalid file type' }, status: :bad_request unless params[:file].instance_of?(ActionDispatch::Http::UploadedFile)

          @image = BlogPhoto.new(image: params[:file], blog_post_id: params[:blog_post_id])

          if %r{image/}.match?(params[:file].content_type) && @image.save
            render json: { location: @image.image.url, id: @image.id }, status: :created
          else
            render json: { errors: @image.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          photo = BlogPhoto.find(params[:id])
          blog_post_id = photo.blog_post_id

          if photo.destroy
            render json: { message: 'Photo deleted successfully', blog_post_id: }
          else
            render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
