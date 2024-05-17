# frozen_string_literal: true

class Api::V1::Admins::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  private

  def respond_with(current_admin, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: AdminSerializer.new(current_admin).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: { message: "Admin couldn't be created successfully. #{current_admin.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end
end
