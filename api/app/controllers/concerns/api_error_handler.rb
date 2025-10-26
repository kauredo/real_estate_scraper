# frozen_string_literal: true

module ApiErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from StandardError do |e|
      render_error(e.message, :internal_server_error)
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      render_error(e.message, :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render_error(e.record.errors.full_messages, :unprocessable_entity)
    end

    rescue_from ActionController::ParameterMissing do |e|
      render_error(e.message, :bad_request)
    end

    rescue_from JWT::DecodeError, JWT::ExpiredSignature do |e|
      render_error(e.message, :unauthorized)
    end
  end

  private

  def render_error(message, status)
    render json: {
      status:,
      error: message.is_a?(Array) ? message : [message]
    }, status:
  end
end
