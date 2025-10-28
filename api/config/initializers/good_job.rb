# frozen_string_literal: true

Rails.application.configure do
  # Configure GoodJob

  # Enable cron jobs (schedule recurring tasks)
  config.good_job.enable_cron = true

  # Execution mode: async (default) runs jobs in-process with web server
  # Set GOOD_JOB_EXECUTION_MODE=external in production for separate worker processes
  config.good_job.execution_mode = ENV.fetch('GOOD_JOB_EXECUTION_MODE', :async).to_sym

  # Cleanup old job records
  config.good_job.cleanup_preserved_jobs_before_seconds_ago = 1.week.to_i
  config.good_job.cleanup_interval_jobs = 1000
  config.good_job.cleanup_interval_seconds = 600

  # Dashboard configuration
  # GoodJob only supports English by default. Set to :en or add custom translations.
  config.good_job.dashboard_default_locale = :en

  # Allow iframe embedding for the dashboard (for backoffice integration)
  # This middleware removes X-Frame-Options header to allow iframe embedding
  # Safe because access is restricted by authentication below
  require Rails.root.join('app/middleware/good_job_iframe_middleware')

  # Add middleware to the main app stack
  # This will run after other middleware and can override their headers
  config.middleware.use GoodJobIframeMiddleware

  # Maximum number of threads for async mode (default: 5)
  # Ignored in external mode (worker process will use its own configuration)
  config.good_job.max_threads = ENV.fetch('GOOD_JOB_MAX_THREADS', 5).to_i

  # Poll interval for new jobs (in seconds)
  config.good_job.poll_interval = ENV.fetch('GOOD_JOB_POLL_INTERVAL', 10).to_i

  # Preserve jobs for debugging
  config.good_job.on_thread_error = ->(exception) { Rails.logger.error(exception) }
end

# Configure Rails to not set default frame options for our app
# This allows our middleware to have full control over frame embedding
Rails.application.config.after_initialize do
  # Disable Rails' default X-Frame-Options header
  # We handle this in our custom middleware for GoodJob routes
  Rails.application.config.force_ssl = false if Rails.env.development?
end

# Add authentication to GoodJob dashboard
# This runs after the engine is loaded
Rails.application.config.to_prepare do
  # Also add the middleware to GoodJob engine after it's loaded
  begin
    GoodJob::Engine.middleware.use GoodJobIframeMiddleware
  rescue StandardError => e
    Rails.logger.debug("Could not add middleware to GoodJob engine: #{e.message}")
  end

  # Add authentication before_action to all GoodJob controllers
  GoodJob::ApplicationController.class_eval do
    before_action :authenticate_super_admin!
    after_action :remove_frame_options_for_iframe

    # Skip CSRF protection for iframe embedding since we have custom auth
    skip_before_action :verify_authenticity_token

    private

    def authenticate_super_admin!
      token = extract_token_from_request

      unless token
        render plain: 'Unauthorized - No authentication token provided', status: :unauthorized
        return
      end

      begin
        decoded = JsonWebToken.decode(token)
        admin = Admin.find_by(id: decoded[:admin_id])

        unless admin&.super_admin?
          render plain: 'Forbidden - Super admin access required', status: :forbidden
          return
        end

        # Store admin for potential future use
        @current_admin = admin
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
        Rails.logger.error("GoodJob authentication failed: #{e.message}")
        render plain: 'Unauthorized - Invalid authentication token', status: :unauthorized
      end
    end

    def remove_frame_options_for_iframe
      # Remove X-Frame-Options header to allow iframe embedding
      response.headers.delete('X-Frame-Options')
      response.headers.delete('x-frame-options')
      response.headers.delete('X-FRAME-OPTIONS')

      # Set iframe-friendly CSP
      cors_origins = ENV.fetch('CORS_ORIGINS', 'http://localhost:5173')
                       .split(',')
                       .map(&:strip)
                       .reject(&:empty?)

      allowed_origins = (cors_origins + ['https://app.myagentwebsite.com']).uniq
      frame_ancestors = allowed_origins.join(' ')

      response.headers['Content-Security-Policy'] =
        "frame-ancestors 'self' #{frame_ancestors}; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src 'self' #{allowed_origins.join(' ')};"

      Rails.logger.debug("GoodJob: Removed X-Frame-Options and set CSP for #{request.method} #{request.path}")
    end

    def extract_token_from_request
      # Try Authorization header first
      if (auth_header = request.headers['Authorization'])
        return auth_header.split.last
      end

      # Try query parameter (for iframe embedding)
      if (token_param = params['token'])
        # Store token in session for subsequent requests within iframe
        session[:good_job_token] = token_param
        return token_param
      end

      # Try session (for subsequent requests after initial token)
      session[:good_job_token]
    end
  end
end
