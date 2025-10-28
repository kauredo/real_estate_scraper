# frozen_string_literal: true

class BaseUploader < CarrierWave::Uploader::Base
  if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']
    include Cloudinary::CarrierWave
    # storage :cloudinary
  else
    storage :file
  end

  def store_dir
    return unless Rails.env.test? || ENV['USE_LOCAL_STORAGE']

    "storage/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def cache_dir
    "#{Rails.root}/tmp/storage"
  end

  # Use environment-specific folders in Cloudinary to prevent dev/prod conflicts
  def public_id
    return super if Rails.env.test? || ENV['USE_LOCAL_STORAGE']

    # Store in folders: sgg/production/, sgg/development/, etc.
    tenant_prefix = tenant_folder_prefix
    environment = Rails.env.to_s
    "#{tenant_prefix}#{environment}/#{model.class.to_s.underscore}/#{super}"
  end

  # Override remove! to prevent deleting production images from development
  # This is crucial when cloning production DB to dev
  def remove!
    return super if Rails.env.test? || ENV['USE_LOCAL_STORAGE']

    # Only delete from Cloudinary if the image belongs to the current environment
    if should_delete_from_cloudinary?
      super
    else
      Rails.logger.info("Skipping Cloudinary deletion: #{file&.path} belongs to different environment")
    end
  end

  private

  def tenant_folder_prefix
    # Get tenant slug from model if available, default to 'sgg'
    tenant_slug = if model.respond_to?(:tenant)
                    model.tenant&.slug || 'sgg'
                  else
                    'sgg'
                  end
    "#{tenant_slug}/"
  end

  def should_delete_from_cloudinary?
    return true unless file&.path

    current_env = Rails.env.to_s
    file_path = file.path

    # Check if the file path contains the current environment
    # Examples:
    # - file.path = "sgg/production/blog_photo/xyz.jpg" in development → false (don't delete)
    # - file.path = "sgg/development/blog_photo/xyz.jpg" in development → true (safe to delete)
    file_path.include?("/#{current_env}/")
  end
end
