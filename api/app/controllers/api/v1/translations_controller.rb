# frozen_string_literal: true

module Api
  module V1
    class TranslationsController < Api::V1::BaseController
      skip_before_action :authenticate_request!, only: [:slug]

      # GET /api/v1/translations/slug?resource_type=listing&slug=apartment-t2-lisbon&locale=pt
      def slug
        resource_type = params[:resource_type]
        current_slug = params[:slug]
        target_locale = params[:locale] || I18n.locale

        resource_class = case resource_type
                         when 'listing' then Listing
                         when 'blog_post' then BlogPost
                         when 'listing_complex' then ListingComplex
                         when 'club_story' then ClubStory
                         else
                           return render json: { error: 'Invalid resource type' }, status: :bad_request
                         end

        # Find resource by slug (friendly_id will search across locales with history enabled)
        resource = resource_class.friendly.find(current_slug)

        # Get the slug in the target locale
        Mobility.with_locale(target_locale) do
          translated_slug = resource.slug
          render json: { slug: translated_slug, id: resource.id }
        end
      rescue ActiveRecord::RecordNotFound
        # If not found, return the original slug (failsafe)
        render json: { slug: current_slug, error: 'Resource not found' }, status: :not_found
      end
    end
  end
end
