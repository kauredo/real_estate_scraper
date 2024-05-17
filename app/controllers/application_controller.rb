# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :set_locale
  before_action :set_resource
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[email])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[email])
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def set_resource
    @resource = nil
  end

  def default_url_options
    { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
  end
end
