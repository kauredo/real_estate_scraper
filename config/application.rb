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
    config.react.camelize_props = false
    config.active_job.queue_adapter = :sidekiq
    config.autoload_paths << Rails.root.join('lib')
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
    config.i18n.available_locales = %i[pt en]
    config.i18n.default_locale = :pt
    config.action_view.sanitized_allowed_attributes = %w[style src alt width height title href target rel allowfullscreen]
    config.action_view.sanitized_allowed_tags = %w[a img h1 h2 h3 h4 h5 h6 p div span iframe ul ol li em strong]
    config.exceptions_app = lambda { |env|
      ErrorsController.action(:show).call(env)
    }
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=15552000',
      'Expires' => 1.year.from_now.to_formatted_s(:rfc822)
    }
  end
end
