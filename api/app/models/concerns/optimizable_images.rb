# frozen_string_literal: true

# Provides image optimization via Cloudinary fetch for external URLs
# This allows automatic optimization of scraped images from external sources
module OptimizableImages
  extend ActiveSupport::Concern

  # Default Cloudinary transformations for listing photos
  LISTING_PHOTO_TRANSFORMS = {
    width: 800,
    height: 600,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
    flags: 'progressive'
  }.freeze

  # Default transformations for thumbnails
  THUMBNAIL_TRANSFORMS = {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  }.freeze

  # Returns optimized photo URLs using Cloudinary fetch
  # Falls back to original URLs if Cloudinary is not configured
  def optimized_photos(transforms: LISTING_PHOTO_TRANSFORMS)
    return photos unless cloudinary_configured?

    photos.map { |url| optimize_image_url(url, transforms) }
  end

  # Returns a single optimized photo URL
  def optimized_photo(index = 0, transforms: LISTING_PHOTO_TRANSFORMS)
    return nil if photos.blank?
    return photos[index] unless cloudinary_configured?

    optimize_image_url(photos[index], transforms)
  end

  # Returns thumbnail-sized optimized photos
  def thumbnail_photos
    optimized_photos(transforms: THUMBNAIL_TRANSFORMS)
  end

  private

  # Optimizes an image URL via Cloudinary fetch
  # If the URL is already from Cloudinary, returns it unchanged
  # If Cloudinary is not configured, returns original URL
  def optimize_image_url(url, transforms)
    return url if url.blank?
    return url if url.include?('cloudinary.com')
    return url unless cloudinary_configured?

    cloud_name = ENV['CLOUDINARY_CLOUD_NAME'] || Cloudinary.config.cloud_name
    return url if cloud_name.blank?

    # Build transformation string
    # Convert Ruby keys to Cloudinary parameters (e.g., fetch_format -> f_auto)
    param_map = {
      width: 'w',
      height: 'h',
      crop: 'c',
      quality: 'q',
      fetch_format: 'f',
      flags: 'fl'
    }

    transform_params = transforms.map do |key, value|
      param_key = param_map[key] || key.to_s[0]
      "#{param_key}_#{value}"
    end.join(',')

    # Return Cloudinary fetch URL
    "https://res.cloudinary.com/#{cloud_name}/image/fetch/#{transform_params}/#{url}"
  end

  def cloudinary_configured?
    return false if Rails.env.test?
    return false if ENV['USE_LOCAL_STORAGE']

    Cloudinary.config.cloud_name.present?
  end
end
