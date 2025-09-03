# frozen_string_literal: true

module Api
  module V1
    class ListingsController < Api::V1::BaseController
      def index
        @q = Listing.includes([:translations]).ransack(params[:q])
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

        render json: {
          listings: paginated[:data],
          pagination: paginated[:pagination],
          max_price: Listing.all.pluck(:price_cents).uniq.reject(&:blank?).map(&:to_i).max,
          stats_keys: Listing.unscoped.possible_stats_keys,
          kinds: Listing.kinds.reject { |k, _v| k == 'other' },
          objectives: Listing.objectives.reject { |k, _v| k == 'other' }
        }
      end

      def show
        @listing = Listing.friendly.find(params[:id])
        render json: @listing,
               serializer: ListingSerializer
      end

      def buy
        index
      end

      def sell
        render json: { message: 'Contact us to sell your property' }
      end
    end
  end
end
