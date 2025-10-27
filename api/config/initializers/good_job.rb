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

  # Add to both the main app middleware (to catch Rails defaults)
  # and GoodJob engine middleware (to catch GoodJob's own headers)
  Rails.application.config.middleware.use GoodJobIframeMiddleware
  GoodJob::Engine.middleware.use GoodJobIframeMiddleware

  # Maximum number of threads for async mode (default: 5)
  # Ignored in external mode (worker process will use its own configuration)
  config.good_job.max_threads = ENV.fetch('GOOD_JOB_MAX_THREADS', 5).to_i

  # Poll interval for new jobs (in seconds)
  config.good_job.poll_interval = ENV.fetch('GOOD_JOB_POLL_INTERVAL', 10).to_i

  # Preserve jobs for debugging
  config.good_job.on_thread_error = ->(exception) { Rails.logger.error(exception) }
end

# Add authentication to GoodJob dashboard
# This runs after the engine is loaded
Rails.application.config.to_prepare do
  # Add authentication before_action to all GoodJob controllers
  GoodJob::ApplicationController.class_eval do
    before_action :authenticate_super_admin!

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
