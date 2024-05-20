# frozen_string_literal: true

class BasicAuth < Rack::Auth::Basic
  def call(env)
    request = Rack::Request.new(env)
    # Match regex hits are not basic authentication
    if request.path.match(%r{^/sidekiq})
      # Execute basic authentication
      super
    else
      # Pass basic authentication
      @app.call(env)
    end
  end
end
