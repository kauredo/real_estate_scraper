# frozen_string_literal: true

module Api
  module V1
    class ListingsController < Api::V1::BaseController
      include Previewable
      include Cacheable

      def index
        # Set HTTP cache headers (5 minutes)
        set_cache_headers(max_age: 5.minutes)
        @q = Listing.includes(:translations, listing_complex: [:translations, :photos]).ransack(params[:q])
        listings = @q.result

        if params[:q].present?
          listings = listings.where("stats->>'Estacionamentos' = ?", params[:q][:Estacionamentos_eq]) if params[:q][:Estacionamentos_eq].present?
          listings = listings.where("stats->>'Quartos' = ?", params[:q][:Quartos_eq]) if params[:q][:Quartos_eq].present?
          listings = listings.where("stats->>'Salas' = ?", params[:q][:Salas_eq]) if params[:q][:Salas_eq].present?
          listings = listings.where("stats->>'Casas de Banho' = ?", params[:q][:'Casas de Banho_eq']) if params[:q][:'Casas de Banho_eq'].present?
          listings = listings.where("stats->>'Área útil' = ?", params[:q][:'Área útil_eq']) if params[:q][:'Área útil_eq'].present?
          listings = listings.where("stats->>'Área bruta (CP)' = ?", params[:q][:'Área bruta (CP)_eq']) if params[:q][:'Área bruta (CP)_eq'].present?
          listings = listings.where("stats->>'Ano de construção' = ?", params[:q][:'Ano de construção_eq']) if params[:q][:'Ano de construção_eq'].present?
          listings = listings.where("stats->>'Área do terreno' = ?", params[:q][:'Área do terreno_eq']) if params[:q][:'Área do terreno_eq'].present?

          listings = listings.objective_sale if params[:q][:objective_eq].blank?
        end

        paginated = paginate(listings, serializer: ListingSerializer)

        # Cache expensive metadata queries (expires in 1 hour)
        metadata = Rails.cache.fetch("tenant_#{Current.tenant.id}/listings_metadata", expires_in: 1.hour) do
          {
            max_price: Listing.maximum(:price_cents) || 0,
            stats_keys: Listing.unscoped.possible_stats_keys,
            kinds: Listing.kinds.except('other').map { |kind, index| { kind:, index: } },
            objectives: Listing.objectives.except('other').map { |objective, index| { objective:, index: } }
          }
        end

        render json: {
          listings: paginated[:data],
          pagination: paginated[:pagination],
          **metadata
        }
      end

      def show
        @listing = Listing.friendly.find(params[:id])

        # Set ETag and Last-Modified headers for conditional GET
        fresh_when(
          etag: [@listing, Current.tenant],
          last_modified: @listing.updated_at,
          public: true
        )

        render json: @listing,
               serializer: ListingSerializer
      end

      def buy
        index
      end

      def sell
        render json: { message: 'Contact us to sell your property' }
      end

      private

      def controller_content_type
        'listing'
      end
    end
  end
end
