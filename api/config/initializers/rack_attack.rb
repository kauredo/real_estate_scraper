# frozen_string_literal: true

class Rack::Attack
  # Use Redis for distributed rate limiting
  Rack::Attack.cache.store = ActiveSupport::Cache::RedisCacheStore.new(url: ENV['REDIS_URL'])

  # Always allow requests from localhost (development)
  safelist('allow-localhost') do |req|
    req.ip == '127.0.0.1' || req.ip == '::1'
  end

  # Allow authenticated admin users higher limits (they use backoffice more intensively)
  safelist('allow-authenticated-admins') do |req|
    # Check if JWT token is present and valid (admins using backoffice)
    # This is a safelist, so these requests bypass all throttles
    if req.env['HTTP_AUTHORIZATION'].present?
      token = req.env['HTTP_AUTHORIZATION'].split(' ').last
      begin
        decoded = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')
        decoded[0]['admin_id'].present? # Only admins get unlimited access
      rescue JWT::DecodeError, JWT::ExpiredSignature
        false
      end
    end
  end

  # Throttle all requests by IP
  # More generous for GET (browsing), stricter for POST (actions)
  throttle('req/ip', limit: 300, period: 1.minute) do |req|
    req.ip unless req.get? # GET requests are unlimited
  end

  # Separate limit for GET requests (very generous, prevents abuse)
  throttle('req/ip/get', limit: 500, period: 1.minute) do |req|
    req.ip if req.get?
  end

  # Throttle login attempts by IP address (5 attempts per minute)
  throttle('logins/ip', limit: 5, period: 1.minute) do |req|
    req.ip if req.path == '/api/v1/auth/login' && req.post?
  end

  # Throttle login attempts by email (5 attempts per 20 minutes)
  throttle('logins/email', limit: 5, period: 20.minutes) do |req|
    if req.path == '/api/v1/auth/login' && req.post?
      # Parse email from request body
      req.params['email'].to_s.downcase.presence
    end
  end

  # Throttle contact form submissions (3 per hour per IP)
  throttle('contact/ip', limit: 3, period: 1.hour) do |req|
    req.ip if req.path == '/api/v1/contact' && req.post?
  end

  # Throttle newsletter subscriptions (10 per hour per IP)
  throttle('newsletter/ip', limit: 10, period: 1.hour) do |req|
    req.ip if req.path == '/api/v1/newsletter_subscriptions' && req.post?
  end

  # Throttle club join requests (5 per hour per IP)
  throttle('club/ip', limit: 5, period: 1.hour) do |req|
    req.ip if req.path == '/api/v1/club/join' && req.post?
  end

  # Exponential backoff for repeat offenders (ban for 1 hour after 300 requests in 5 minutes)
  blocklist('block-repeat-offenders') do |req|
    # `filter` returns true if request count exceeds limit
    Rack::Attack::Allow2Ban.filter(req.ip, maxretry: 300, findtime: 5.minutes, bantime: 1.hour) do
      # The count for the IP is incremented if the return value is truthy
      true
    end
  end

  # Custom response when rate limit is exceeded
  self.throttled_responder = lambda do |request|
    match_data = request.env['rack.attack.match_data']
    now = Time.now
    retry_after = (match_data[:period] - (now.to_i % match_data[:period])).to_i

    [
      429, # HTTP 429 Too Many Requests
      {
        'Content-Type' => 'application/json',
        'X-RateLimit-Limit' => match_data[:limit].to_s,
        'X-RateLimit-Remaining' => '0',
        'X-RateLimit-Reset' => (now + retry_after).to_s,
        'Retry-After' => retry_after.to_s
      },
      [{ error: 'Too many requests. Please try again later.' }.to_json]
    ]
  end
end

# Log rate limit events
ActiveSupport::Notifications.subscribe('rack.attack') do |name, start, finish, request_id, payload|
  req = payload[:request]
  if [:throttle, :blocklist].include?(req.env['rack.attack.match_type'])
    Rails.logger.warn([
      'Rack::Attack',
      req.env['rack.attack.match_type'],
      req.ip,
      req.request_method,
      req.fullpath,
      req.env['rack.attack.matched']
    ].join(' | '))
  end
end
