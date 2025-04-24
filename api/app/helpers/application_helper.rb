# frozen_string_literal: true

module ApplicationHelper
  extend ActiveSupport::NumberHelper

  def dark_mode?
    session[:dark_mode] == true
  end
end
