# frozen_string_literal: true

module Api
  module V1
    module Admin
      class BaseController < Api::V1::BaseController
        before_action :authenticate_admin!
        before_action :ensure_admin_confirmed!

        private

        def ensure_admin_confirmed!
          return if @current_admin&.confirmed?

          render json: { error: 'Admin account not confirmed' }, status: :forbidden
        end
      end
    end
  end
end
