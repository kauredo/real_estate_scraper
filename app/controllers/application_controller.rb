# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def default_url_options
    { host: ENV['APP_DOMAIN'] || 'localhost:3000' }
  end
end
