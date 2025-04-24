# frozen_string_literal: true

module Api
  module V1
    class AuthController < Api::V1::BaseController
      def login
        admin = Admin.find_by(email: params[:email])

        if admin&.valid_password?(params[:password])
          token = JsonWebToken.encode(admin_id: admin.id)
          time = Time.zone.now + 24.hours.to_i

          render json: {
            token:,
            exp: time.strftime('%m-%d-%Y %H:%M'),
            admin_id: admin.id,
            email: admin.email,
            confirmed: admin.confirmed
          }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end
