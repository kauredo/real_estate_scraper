# frozen_string_literal: true

module Api
  module V1
    module Admin
      class ListingsController < Api::V1::Admin::BaseController
        before_action :find_listing, except: %i[index create update_all]
        after_action :update_video_link, only: %i[create update]

        def index
          listings = case params[:order]
                     when 'recent'
                       Listing.all.reorder(created_at: :desc)
                     when 'deleted'
                       Listing.with_deleted_ordered.where(id: Listing.ids_with_title)
                     when 'deleted_only'
                       Listing.only_deleted.where(id: Listing.ids_with_title)
                     else
                       Listing.all
                     end

          result = paginate(listings, serializer: ListingSerializer)

          render json: {
            listings: result[:data],
            pagination: result[:pagination],
            max_price: Listing.unscoped.pluck(:price_cents).uniq.compact_blank.map(&:to_i).max,
            stats_keys: Listing.unscoped.possible_stats_keys,
            kinds: Listing.kinds.map { |kind, index| { kind:, index: } },
            objectives: Listing.objectives.map { |objective, index| { objective:, index: } },
            statuses: Listing.statuses.map { |status, index| { status:, index: } }
          }
        end

        def show
          render json: @listing,
                 serializer: ListingSerializer
        end

        def create
          # If URL is provided, use scraping logic like the old controller
          if listing_params[:url].present? && listing_params[:url].starts_with?('https://www.kwportugal.pt/')
            @listing = Listing.find_or_create_by(url: listing_params[:url])
            ScrapeUrlJob.perform_later(@listing.url, true)

            render json: {
              message: 'Imóvel adicionado à fila de processamento. Os dados serão atualizados em breve.',
              listing: ListingSerializer.new(@listing)
            }, status: :created
          else
            # Manual creation without URL
            @listing = Listing.new(listing_params)

            if @listing.save
              render json: {
                message: 'Listing criado com sucesso',
                listing: ListingSerializer.new(@listing)
              }, status: :created
            else
              render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
            end
          end
        end

        def update
          if @listing.update(listing_params)
            render json: {
              message: 'Listing atualizado com sucesso',
              listing: ListingSerializer.new(@listing)
            }
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
            # Also trigger scraping to get latest data after recovery
            ScrapeUrlJob.perform_later(@listing.url, true) if @listing.url.present?
            render json: { message: 'Listing recuperado com sucesso. Dados serão atualizados em breve.' }
          else
            render json: { errors: ['Erro ao recuperar listing'] }, status: :unprocessable_entity
          end
        end

        def update_details
          # Scrape/update details from original source
          ScrapeUrlJob.perform_later(@listing.url, true)
          render json: { message: 'Atualização dos detalhes iniciada. Os dados serão atualizados em breve.' }
        end

        def update_all
          # Update all listings from external source
          ScrapeAll.perform_later
          render json: { message: 'Atualização de todos os imóveis iniciada. O processo será executado em segundo plano.' }
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
            next if filters[filter_key].blank?

            listings = listings.where("stats->>'#{field}' = ?", filters[filter_key])
          end

          ['Casas de Banho', 'Área útil', 'Área bruta (CP)', 'Ano de construção', 'Área do terreno'].each do |field|
            filter_key = "#{field}_eq"
            next if filters[filter_key].blank?

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
