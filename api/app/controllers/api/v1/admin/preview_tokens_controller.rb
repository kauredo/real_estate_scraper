# frozen_string_literal: true

module Api
  module V1
    module Admin
      class PreviewTokensController < Api::V1::Admin::BaseController
        # POST /api/v1/admin/preview_tokens
        def create
          content_type = params[:content_type]
          content_id = params[:content_id]

          return render json: { error: 'Invalid content type' }, status: :unprocessable_entity unless valid_content_type?(content_type)

          return render json: { error: 'Content ID is required' }, status: :unprocessable_entity if content_id.blank?

          # Find the content to get its tenant_id
          content = find_content(content_type, content_id)
          return render json: { error: 'Content not found' }, status: :not_found unless content

          # Verify admin has access to this content's tenant
          return render json: { error: 'Unauthorized' }, status: :forbidden unless @current_admin.super_admin? || @current_admin.tenant_id == content.tenant_id

          # Generate JWT token that expires in 1 hour, using the content's tenant_id
          token = generate_preview_token(
            tenant_id: content.tenant_id,
            content_type:,
            content_id:
          )

          # Construct preview URL
          preview_url = build_preview_url(content_type, content_id, token, content.tenant_id)

          render json: {
            token:,
            preview_url:,
            expires_at: 1.hour.from_now
          }, status: :created
        end

        private

        def valid_content_type?(type)
          %w[blog_post club_story listing listing_complex].include?(type)
        end

        def find_content(content_type, content_id)
          model_class = case content_type
                        when 'blog_post' then BlogPost
                        when 'club_story' then ClubStory
                        when 'listing' then Listing
                        when 'listing_complex' then ListingComplex
                        end

          model_class&.find_by(id: content_id)
        end

        def generate_preview_token(tenant_id:, content_type:, content_id:)
          payload = {
            tenant_id:,
            content_type:,
            content_id:,
            exp: 1.hour.from_now.to_i
          }

          JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
        end

        def build_preview_url(content_type, content_id, token, tenant_id)
          # Find the content to get its slug for the URL
          content = find_content(content_type, content_id)
          content_slug = content&.slug || content_id

          # In development, use localhost:5173
          # In production, use tenant domain
          base_url = if Rails.env.development?
                       ENV.fetch('PREVIEW_BASE_URL', 'http://localhost:5173')
                     else
                       tenant = Tenant.find_by(id: tenant_id)
                       "https://#{tenant&.domain}"
                     end

          path = case content_type
                 when 'blog_post'
                   "/blog/#{content_slug}"
                 when 'club_story'
                   "/clube-sgg/historias/#{content_slug}"
                 when 'listing'
                   "/comprar/#{content_slug}"
                 when 'listing_complex'
                   "/empreendimentos/#{content_slug}"
                 end

          "#{base_url}#{path}?preview_token=#{token}"
        end
      end
    end
  end
end
