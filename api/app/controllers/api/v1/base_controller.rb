# frozen_string_literal: true

module Api
  module V1
    class BaseController < Api::BaseController
      def toggle_dark_mode
        session[:dark_mode] = !session[:dark_mode]
        render json: { success: true, dark_mode: session[:dark_mode] }
      end
    end
  end
end
