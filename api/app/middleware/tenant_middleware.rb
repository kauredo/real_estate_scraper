# frozen_string_literal: true

# Middleware to identify tenant from API key in request headers
# Sets Current.tenant for the duration of the request
class TenantMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)
    api_key = extract_api_key(request)

    if api_key.present?
      tenant = Tenant.find_by(api_key:, active: true)
      Current.tenant = tenant if tenant
    end

    @app.call(env)
  ensure
    # Always clear context after request to prevent leakage between requests
    Current.reset
  end

  private

  def extract_api_key(request)
    # Priority 1: X-API-Key header (recommended)
    api_key = request.headers['X-API-Key']
    return api_key if api_key.present?

    # Priority 2: X-Tenant-Key header (alternative)
    api_key = request.headers['X-Tenant-Key']
    return api_key if api_key.present?

    # Priority 3: Query parameter (for webhooks, RSS feeds, etc.)
    api_key = request.params['api_key']
    return api_key if api_key.present?

    nil
  end
end
