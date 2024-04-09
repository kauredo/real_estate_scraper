# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :set_locale
  before_action :set_resource

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
    session[:locale] = I18n.locale
  end

  def set_resource
    @resource = nil
  end

  def default_url_options
    { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
  end
end
