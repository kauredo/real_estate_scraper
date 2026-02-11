# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { host: ENV['APP_DOMAIN'] || 'localhost:3100', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
  end
end
