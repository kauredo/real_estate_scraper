# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'
require 'i18n-js'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SofiaGalvao
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.active_job.queue_adapter = :sidekiq
    config.autoload_paths << Rails.root.join('lib')
    config.i18n.available_locales = %i[pt en]
    config.i18n.default_locale = :pt
    config.api_only = true
    config.session_store :cache_store, key: 'sofia_galvao_session'
  end
end
