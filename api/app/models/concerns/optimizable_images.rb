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

    # Extract actual image URL from Next.js image optimization proxies
    # Example: https://www.kwportugal.pt/_next/image?url=https%3A%2F%2Fimgs.soukwportugal.pt%2F...&w=3840
    # We need: https://imgs.soukwportugal.pt/...
    actual_url = extract_actual_image_url(url)

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
    "https://res.cloudinary.com/#{cloud_name}/image/fetch/#{transform_params}/#{actual_url}"
  end

  # Extracts the actual image URL from Next.js image optimization proxy URLs
  # Also handles other image proxy patterns
  def extract_actual_image_url(url)
    return url if url.blank?

    uri = URI.parse(url)

    # Check if it's a Next.js image optimization URL
    # Pattern: /_next/image?url=<encoded_url>&w=...&q=...
    if uri.path&.include?('/_next/image')
      query_params = URI.decode_www_form(uri.query || '')
      url_param = query_params.find { |k, _v| k == 'url' }
      return URI.decode_www_form_component(url_param[1]) if url_param
    end

    # Return original URL if no extraction needed
    url
  rescue URI::InvalidURIError => e
    Rails.logger.warn("Failed to parse image URL: #{url} - #{e.message}")
    url
  end

  def cloudinary_configured?
    return false if Rails.env.test?
    return false if ENV['USE_LOCAL_STORAGE']

    Cloudinary.config.cloud_name.present?
  end
end
