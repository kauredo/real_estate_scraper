require 'carrierwave/orm/activerecord'
require 'cloudinary' if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']

CarrierWave.configure do |config|
  config.cache_storage = :file if !Rails.env.test? && !ENV['USE_LOCAL_STORAGE']
end
