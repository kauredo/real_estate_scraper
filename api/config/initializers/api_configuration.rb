# frozen_string_literal: true

# Configure API rate limits, authentication settings, etc.
Rails.application.config.api = {
  default_per_page: 25,
  max_per_page: 100,
  token_expiration: 24.hours,
  max_login_attempts: 5,
  lock_time: 30.minutes
}

# Set Active Model Serializer configuration if using the gem
ActiveModelSerializers.config.adapter = :json if defined?(ActiveModelSerializers)
