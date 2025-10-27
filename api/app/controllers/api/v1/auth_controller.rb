# frozen_string_literal: true

module Api
  module V1
    class AuthController < Api::V1::BaseController
      skip_before_action :verify_tenant, only: %i[login logout]

      def login
        admin = ::Admin.find_by(email: params[:email])

        if admin&.valid_password?(params[:password])
          token = JsonWebToken.encode(
            admin_id: admin.id,
            email: admin.email,
            tenant_id: admin.tenant_id,
            super_admin: admin.super_admin?
          )
          time = Time.zone.now + 24.hours.to_i

          render json: {
            token:,
            exp: time.strftime('%m-%d-%Y %H:%M'),
            admin_id: admin.id,
            email: admin.email,
            confirmed: admin.confirmed,
            tenant_id: admin.tenant_id,
            is_super_admin: admin.super_admin?
          }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def logout
        # Clear any session data or invalidate token if needed
        render json: { message: 'Logged out successfully' }, status: :ok
      end
    end
  end
end
