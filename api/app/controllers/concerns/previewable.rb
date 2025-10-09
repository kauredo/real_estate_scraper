# frozen_string_literal: true

module Previewable
  extend ActiveSupport::Concern

  included do
    before_action :check_preview_token, if: -> { params[:preview_token].present? }
  end

  private

  def check_preview_token
    @preview_mode = validate_preview_token(params[:preview_token])
  end

  def preview_mode?
    @preview_mode == true
  end

  def validate_preview_token(token)
    decoded = JWT.decode(
      token,
      Rails.application.credentials.secret_key_base,
      true,
      { algorithm: 'HS256' }
    )
    payload = decoded.first

    # Verify tenant matches
    return false unless payload['tenant_id'] == Current.tenant&.id

    # Verify content type matches
    return false unless payload['content_type'] == controller_content_type

    # Verify content ID matches
    return false unless payload['content_id'].to_s == params[:id].to_s

    true
  rescue JWT::DecodeError, JWT::ExpiredSignature
    false
  end

  def controller_content_type
    raise NotImplementedError, 'Subclasses must implement controller_content_type'
  end
end
