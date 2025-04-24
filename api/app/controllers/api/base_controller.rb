# frozen_string_literal: true

module Api
  class BaseController < ActionController::API
    include ActionController::MimeResponds
    include ActionController::Cookies
    include ApiErrorHandler
    include ApiPagination

    before_action :set_locale

    private

    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end

    attr_reader :current_admin

    def authenticate_admin!
      header = request.headers['Authorization']
      return render json: { error: 'No token provided' }, status: :unauthorized unless header

      token = header.split(' ').last
      begin
        decoded = JsonWebToken.decode(token)
        @current_admin = Admin.find(decoded[:admin_id])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    end

    def default_url_options
      { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
    end
  end
end
