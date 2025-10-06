# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    include ActionController::MimeResponds
    include ApiErrorHandler
    include ApiPagination

    before_action :set_locale
    before_action :verify_tenant

    protected

    def authenticate_admin!
      header = request.headers['Authorization']
      return render json: { error: 'No token provided' }, status: :unauthorized unless header

      token = header.split(' ').last
      begin
        decoded = JsonWebToken.decode(token)
        return render json: { error: 'Invalid token' }, status: :unauthorized unless decoded

        @current_admin = Admin.find(decoded[:admin_id])

        # Verify admin belongs to current tenant (unless super admin)
        return render json: { error: 'Unauthorized - tenant mismatch' }, status: :unauthorized unless @current_admin.super_admin? || @current_admin.tenant_id == Current.tenant&.id
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    end

    private

    attr_reader :current_admin

    def verify_tenant
      return if Current.tenant

      render json: { error: 'Invalid or missing API key' }, status: :unauthorized
      false
    end

    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end

    def default_url_options
      { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
    end
  end
end
