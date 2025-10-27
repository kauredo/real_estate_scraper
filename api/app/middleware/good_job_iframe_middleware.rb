# frozen_string_literal: true

# Middleware to allow GoodJob dashboard to be embedded in iframes
# This is safe because access is restricted by controller-level authentication
# (see config/initializers/good_job.rb for authentication logic)
class GoodJobIframeMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    # Check if this is a GoodJob route before processing
    is_good_job_route = env['PATH_INFO']&.start_with?('/good_job')

    status, headers, response = @app.call(env)

    # Allow iframe embedding for GoodJob dashboard routes
    if is_good_job_route
      # Remove ALL frame-related headers that might block embedding
      headers.delete('X-Frame-Options')
      headers.delete('x-frame-options')
      headers.delete('X-FRAME-OPTIONS')

      # Set Content-Security-Policy to allow specific origins to embed
      # Get allowed origins from CORS_ORIGINS env variable
      cors_origins = ENV.fetch('CORS_ORIGINS', 'http://localhost:5173')
                       .split(',')
                       .map(&:strip)
                       .reject(&:empty?)

      # Add common production origins
      allowed_origins = cors_origins + [
        'https://app.myagentwebsite.com'
      ]

      # Build CSP frame-ancestors directive
      frame_ancestors = allowed_origins.uniq.join(' ')

      # Override any existing CSP header
      headers['Content-Security-Policy'] = "frame-ancestors 'self' #{frame_ancestors}"

      # Also set X-Frame-Options to allow from our origins
      # Note: X-Frame-Options doesn't support multiple origins, so we remove it
      # and rely on CSP frame-ancestors instead
    end

    [status, headers, response]
  end
end
