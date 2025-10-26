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

    # Verify content ID matches by resolving the slug/id to the actual record
    content = find_content_by_param(params[:id])
    return false unless content
    return false unless content.id == payload['content_id']

    # Store the found content for potential reuse in controller actions
    @preview_content = content

    true
  rescue JWT::DecodeError, JWT::ExpiredSignature
    false
  end

  def controller_content_type
    raise NotImplementedError, 'Subclasses must implement controller_content_type'
  end

  def find_content_by_param(param)
    model_class = case controller_content_type
                  when 'blog_post' then BlogPost
                  when 'club_story' then ClubStory
                  when 'listing' then Listing
                  when 'listing_complex' then ListingComplex
                  else
                    return nil
                  end

    # Use friendly.find to support both slugs and IDs
    model_class.friendly.find(param)
  rescue ActiveRecord::RecordNotFound
    nil
  end
end
