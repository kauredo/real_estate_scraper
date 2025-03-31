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
end
