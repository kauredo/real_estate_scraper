class BlogPhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    return unless params[:file].instance_of?(ActionDispatch::Http::UploadedFile)

    @image = BlogPhoto.new(image: params[:file], blog_post_id: Rails.cache.read('blog-id'))

    respond_to do |format|
      if @image.save
        format.json { render json: { "location": @image.image.url }.to_json, status: :ok }
      else
        format.json { render json: @image.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    photo = BlogPhoto.find(params[:id])
    photo.destroy!
  end
end
