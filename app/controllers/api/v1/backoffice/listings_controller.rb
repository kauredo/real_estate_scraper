# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class ListingsController < BackofficeController
        before_action :find_listing, except: %i[index create update_all]
        after_action :update_video_link, only: %i[create update]
        include Pagy::Backend

        def index
          @listings = if params[:order] == 'recent'
                        Listing.all.reorder(created_at: :desc)
                      else
                        Listing.all
                      end
          render json: @listings.as_json(include: %i[listing_complex], methods: %i[main_photo])
        end

        def create
          if listing_params[:url].present? && listing_params[:url].starts_with?('https://www.kwportugal.pt/')
            listing = Listing.find_or_create_by(url: listing_params[:url])
            ScrapeUrlJob.perform_async(listing.url, true)
            render json: { message: I18n.t('listing.create.notice') }, status: :created
          else
            render json: { errors: [I18n.t('listing.create.error')] }, status: :unprocessable_entity
          end
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def update
          new_params = listing_params.dup
          if new_params[:status] != @listing.status
            new_params[:status_changed_at] = if new_params[:status] == 'sold'
                                               Time.zone.now
                                             else
                                               @listing.update(status_changed_at: nil)
                                             end
          end

          @listing.slug = nil
          @listing.update(new_params)
          render json: { message: I18n.t('listing.update.notice'), listing: @listing }, status: :ok
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def update_all
          ScrapeAll.perform_async
          render json: { message: I18n.t('listing.update_all.notice') }, status: :ok
        end

        def destroy
          @listing.destroy
          render json: { message: 'Imóvel eliminado com sucesso' }, status: :ok
        end

        def update_details
          ScrapeUrlJob.perform_async(@listing.url, true)
          render json: { message: I18n.t('listing.update_details.notice') }, status: :ok
        end

        private

        def find_listing
          @listing = Listing.friendly.find(params[:id])
        end

        def update_video_link
          return if @listing.blank?
          return if @listing.video_link.blank?

          @listing.video_link.sub!('watch?v=', 'embed/')
          @listing.video_link.sub!('youtu.be/', 'youtube.com/embed/')
          @listing.save
        end

        def listing_params
          params.require(:listing).permit(:address, :price, :title, :order, :url, :description, :status, :status_changed_at,
                                          :listing_complex_id, :video_link, features: [], photos: [], stats: {})
        end
      end
    end
  end
end
