# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Split CORS_ORIGINS by comma and clean up whitespace
    cors_origins = ENV.fetch('CORS_ORIGINS', 'http://localhost:3101')
                      .split(',')
                      .map(&:strip)
                      .reject(&:empty?) # Remove empty strings from splitting

    # Convert wildcard patterns to regex for proper matching
    processed_origins = cors_origins.map do |origin|
      if origin.include?('*')
        # Convert wildcard pattern to regex
        regex_pattern = origin.gsub('.', '\.').gsub('*', '.*')
        /^#{regex_pattern}$/
      else
        origin
      end
    end

    origins processed_origins

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true,
             expose: ['Authorization']
  end
end
