# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_locale
  before_action :set_resource

  def dark_mode?
    session[:dark_mode] == true
  end

  def toggle_dark_mode
    session[:dark_mode] = !session[:dark_mode]
    redirect_back(fallback_location: root_path)
  end

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
