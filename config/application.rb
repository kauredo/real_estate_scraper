# frozen_string_literal: true

require_relative 'boot'
require_relative '../lib/basic_auth'
require 'rails/all'
require 'i18n-js'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RealEstateScraper
  class Application < Rails::Application
    config.api_only = true

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.active_job.queue_adapter = :sidekiq
    config.autoload_paths << Rails.root.join('lib')
    config.i18n.available_locales = %i[pt en]
    config.i18n.default_locale = :pt
    config.session_store :cache_store, key: 'sofia_galvao_session', expire_after: 1.day
    # Required for all session management (regardless of session_store)
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options

    config.middleware.use BasicAuth do |username, password|
      username == Rails.application.credentials.basic_auth[:username] && password == Rails.application.credentials.basic_auth[:password]
    end
  end
end
