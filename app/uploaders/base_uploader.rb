# frozen_string_literal: true

class BaseUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']

  storage :file if Rails.env.test? || ENV['USE_LOCAL_STORAGE']
  storage :cloudinary unless Rails.env.test? || ENV['USE_LOCAL_STORAGE']

  def store_dir
    return unless Rails.env.test? || ENV['USE_LOCAL_STORAGE']

    "storage/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def cache_dir
    "#{Rails.root}/tmp/storage"
  end
end
