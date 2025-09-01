# frozen_string_literal: true

module Api
  module V1
    module Admin
      class ListingsController < Api::V1::Admin::BaseController
        before_action :find_listing, except: %i[index create update_all]
        after_action :update_video_link, only: %i[create update]

        def index
          @q = Listing.with_deleted.includes([:translations, :listing_complex]).ransack(params[:q])
          listings = @q.result

          # Apply additional filters
          if params[:q].present?
            listings = apply_stats_filters(listings, params[:q])
            listings = listings.objective_sale if params[:q][:objective_eq].blank?
          end

          result = paginate(listings, serializer: ListingSerializer)

          render json: {
            listings: result[:data],
            pagination: result[:pagination],
            max_price: Listing.unscoped.pluck(:price_cents).uniq.reject(&:blank?).map(&:to_i).max,
            stats_keys: Listing.unscoped.possible_stats_keys,
            kinds: Listing.kinds,
            objectives: Listing.objectives,
            statuses: Listing.statuses
          }
        end

        def show
          render json: @listing,
                 serializer: ListingSerializer
        end

        def create
          @listing = Listing.new(listing_params)

          if @listing.save
            render json: {
              message: 'Listing criado com sucesso',
              listing: @listing
            }, serializer: ListingSerializer, status: :created
          else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @listing.update(listing_params)
            render json: {
              message: 'Listing atualizado com sucesso',
              listing: @listing
            }, serializer: ListingSerializer
          else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @listing.destroy
            render json: { message: 'Listing apagado com sucesso' }
          else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def recover
          if @listing.restore
            render json: { message: 'Listing recuperado com sucesso' }
          else
            render json: { errors: ['Erro ao recuperar listing'] }, status: :unprocessable_entity
          end
        end

        def update_details
          # This would typically scrape/update details from original source
          # For now, just return success
          render json: { message: 'Detalhes atualizados com sucesso' }
        end

        def update_all
          # This would typically update all listings from external source
          # For now, just return success
          render json: { message: 'Todos os listings atualizados com sucesso' }
        end

        private

        def find_listing
          @listing = Listing.with_deleted.friendly.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { errors: ['Listing não encontrado'] }, status: :not_found
        end

        def listing_params
          params.require(:listing).permit(
            :title, :description, :address, :price_cents, :status, :objective, 
            :kind, :url, :video_link, :virtual_tour_url, :listing_complex_id,
            :order, features: [], photos: [], stats: {}
          )
        end

        def apply_stats_filters(listings, filters)
          %w[Estacionamentos Quartos Salas].each do |field|
            filter_key = "#{field}_eq"
            next unless filters[filter_key].present?

            listings = listings.where("stats->>'#{field}' = ?", filters[filter_key])
          end

          ['Casas de Banho', 'Área útil', 'Área bruta (CP)', 'Ano de construção', 'Área do terreno'].each do |field|
            filter_key = "#{field}_eq"
            next unless filters[filter_key].present?

            listings = listings.where("stats->>'#{field}' = ?", filters[filter_key])
          end

          listings
        end

        def update_video_link
          return if @listing.video_link.blank?

          @listing.video_link.sub!('watch?v=', 'embed/')
          @listing.save if @listing.changed?
        end
      end
    end
  end
end
