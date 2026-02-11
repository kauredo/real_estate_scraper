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

    # Allow iframe embedding for GoodJob dashboard routes (all HTTP methods)
    if is_good_job_route
      Rails.logger.debug("GoodJobIframeMiddleware: Processing #{env['REQUEST_METHOD']} #{env['PATH_INFO']}")

      # Remove ALL frame-related headers that might block embedding
      # Use case-insensitive removal to catch all variants
      headers_to_remove = ['X-Frame-Options', 'x-frame-options', 'X-FRAME-OPTIONS']
      headers_to_remove.each do |header|
        headers.delete(header)
        Rails.logger.debug("GoodJobIframeMiddleware: Removed header #{header}") if headers.key?(header)
      end

      # Set Content-Security-Policy to allow specific origins to embed
      # Get allowed origins from CORS_ORIGINS env variable
      cors_origins = ENV.fetch('CORS_ORIGINS', 'http://localhost:3101')
                       .split(',')
                       .map(&:strip)
                       .reject(&:empty?)

      # Add common production origins
      allowed_origins = cors_origins + [
        'https://app.myagentwebsite.com'
      ]

      # Build CSP frame-ancestors directive
      frame_ancestors = allowed_origins.uniq.join(' ')

      # Set a permissive CSP for iframe embedding while maintaining security
      csp_value = "frame-ancestors 'self' #{frame_ancestors}; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src 'self' #{frame_ancestors};"
      headers['Content-Security-Policy'] = csp_value

      Rails.logger.debug("GoodJobIframeMiddleware: Set CSP to: #{csp_value}")

      # Explicitly ensure no X-Frame-Options header is set
      # This is critical for iframe embedding to work
      headers.delete('X-Frame-Options')
    end

    [status, headers, response]
  end
end
