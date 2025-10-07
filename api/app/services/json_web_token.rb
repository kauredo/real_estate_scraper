# frozen_string_literal: true

class JsonWebToken
  JWT_SECRET = ENV['JWT_SECRET'] || Rails.application.credentials.secret_key_base || ENV['SECRET_KEY_BASE'] || 'development_secret_key_change_in_production'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    decoded = JWT.decode(token, JWT_SECRET)[0]
    ActiveSupport::HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
