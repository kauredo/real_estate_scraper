# frozen_string_literal: true

require 'carrierwave/orm/activerecord'
require 'cloudinary' if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']

CarrierWave.configure do |config|
  config.cache_storage = :file if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']

  # Enable automatic deletion - BaseUploader has smart logic to prevent
  # deleting production images from development environment
  config.remove_previously_stored_files_after_update = true
end
