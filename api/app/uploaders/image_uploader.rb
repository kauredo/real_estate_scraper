# frozen_string_literal: true

class ImageUploader < BaseUploader
  include Cloudinary::CarrierWave

  # Create different versions for different use cases
  version :thumb do
    cloudinary_transformation width: 500, height: 300, crop: :fill, quality: :auto, fetch_format: :auto
  end

  version :medium do
    cloudinary_transformation width: 800, height: 600, crop: :limit, quality: :auto, fetch_format: :auto
  end

  version :large do
    cloudinary_transformation width: 1200, height: 900, crop: :limit, quality: :auto, fetch_format: :auto
  end

  # Optimize the original upload
  def default_transformations
    [{ quality: :auto, fetch_format: :auto }]
  end
end
