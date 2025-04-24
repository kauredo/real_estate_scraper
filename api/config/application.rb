# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module SofiaGalvao
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.api_only = true # Add this line

    config.active_job.queue_adapter = :good_job
    config.autoload_paths << Rails.root.join('lib')
    config.i18n.available_locales = %i[pt en]
    config.i18n.default_locale = :pt

    # Add cookie and session middleware (needed for authentication)
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Replace the default ErrorsController with a JSON error handler
    config.exceptions_app = lambda { |env|
      Api::V1::ErrorsController.action(:show).call(env)
    }

    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=15552000',
      'Expires' => 1.year.from_now.to_formatted_s(:rfc822)
    }
  end
end
