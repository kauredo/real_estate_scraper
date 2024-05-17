# frozen_string_literal: true

class Api::V1::Admins::SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  def create
    admin = Admin.find_by(email: params[:email])

    if admin&.valid_password?(params[:password])
      jwt = JWT.encode({ sub: admin.id }, Rails.application.credentials.devise_jwt_secret_key)
      # Manually construct the response to include the token
      render json: {
        status: {
          code: 200,
          message: 'Logged in successfully.',
          data: { admin: AdminSerializer.new(admin).serializable_hash[:data][:attributes], token: jwt }
        }
      }, status: :ok
    else
      render json: {
        status: 401,
        message: 'Invalid credentials.'
      }, status: :unauthorized
    end
  end

  private

  def respond_with(current_admin, _opts = {})
    jwt = JWT.encode({ sub: admin.id }, Rails.application.credentials.devise_jwt_secret_key)
    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { admin: AdminSerializer.new(current_admin).serializable_hash[:data][:attributes], token: jwt }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_admin = Admin.find(jwt_payload['sub'])
    end

    if current_admin
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
