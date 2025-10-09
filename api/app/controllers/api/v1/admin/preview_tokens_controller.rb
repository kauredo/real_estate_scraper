# frozen_string_literal: true

module Api
  module V1
    module Admin
      class PreviewTokensController < Api::V1::Admin::BaseController
        # POST /api/v1/admin/preview_tokens
        def create
          content_type = params[:content_type]
          content_id = params[:content_id]

          unless valid_content_type?(content_type)
            return render json: { error: 'Invalid content type' }, status: :unprocessable_entity
          end

          unless content_id.present?
            return render json: { error: 'Content ID is required' }, status: :unprocessable_entity
          end

          # Generate JWT token that expires in 1 hour
          token = generate_preview_token(
            tenant_id: Current.tenant&.id,
            content_type: content_type,
            content_id: content_id
          )

          # Construct preview URL
          preview_url = build_preview_url(content_type, content_id, token)

          render json: {
            token: token,
            preview_url: preview_url,
            expires_at: 1.hour.from_now
          }, status: :created
        end

        private

        def valid_content_type?(type)
          %w[blog_post club_story listing listing_complex].include?(type)
        end

        def generate_preview_token(tenant_id:, content_type:, content_id:)
          payload = {
            tenant_id: tenant_id,
            content_type: content_type,
            content_id: content_id,
            exp: 1.hour.from_now.to_i
          }

          JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
        end

        def build_preview_url(content_type, content_id, token)
          # In development, use localhost:5173
          # In production, use tenant domain
          base_url = if Rails.env.development?
                       ENV.fetch('PREVIEW_BASE_URL', 'http://localhost:5173')
                     else
                       "https://#{Current.tenant&.domain}"
                     end

          path = case content_type
                 when 'blog_post'
                   "/blog/#{content_id}"
                 when 'club_story'
                   "/clube-sgg/historias/#{content_id}"
                 when 'listing'
                   "/comprar/#{content_id}"
                 when 'listing_complex'
                   "/empreendimentos/#{content_id}"
                 end

          "#{base_url}#{path}?preview_token=#{token}"
        end
      end
    end
  end
end
