# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :set_locale

  def toggle_dark_mode
    session[:dark_mode] = !session[:dark_mode]
    render json: { dark_mode: session[:dark_mode] }
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
  end
end
