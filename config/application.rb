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
    config.react.camelize_props = true
    config.active_job.queue_adapter = :sidekiq
    config.autoload_paths << Rails.root.join('lib')
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
    config.i18n.available_locales = %i[pt en]
    config.i18n.default_locale = :pt
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
