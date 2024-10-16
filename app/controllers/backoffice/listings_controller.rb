# frozen_string_literal: true

module Backoffice
  class ListingsController < BackofficeController
    before_action :find_listing, except: %i[index create update_all recover]
    after_action :update_video_link, only: %i[create update]
    include Pagy::Backend

    def index
      @listings = if params[:order] == 'recent'
                    Listing.all.reorder(created_at: :desc)
                  elsif params[:order] == 'deleted'
                    Listing.with_deleted_ordered.where(id: Listing.ids_with_title)
                  elsif params[:order] == 'deleted_only'
                    Listing.only_deleted.where(id: Listing.ids_with_title)
                  else
                    Listing.all
                  end

      pagy, @listings = pagy(@listings)
      @pagy = pagy_metadata(pagy)
    end

    def create
      if listing_params[:url].present? && listing_params[:url].starts_with?('https://www.kwportugal.pt/')
        listing = Listing.find_or_create_by(url: listing_params[:url])
        ScrapeUrlJob.perform_async(listing.url, true)
        flash[:notice] = I18n.t('listing.create.notice')
      else
        flash[:error] = I18n.t('listing.create.error')
      end
      redirect_to(backoffice_path)
    end

    def edit; end

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
      flash[:notice] = I18n.t('listing.update.notice')
      redirect_to edit_backoffice_listing_path(@listing)
    end

    def update_all
      ScrapeAll.perform_async
      flash[:notice] = I18n.t('listing.update_all.notice')
      redirect_to backoffice_listings_path(order: params[:order])
    end

    def destroy
      if @listing.destroy
        flash[:notice] = I18n.t('listing.destroy.notice')
      else
        flash[:error] = I18n.t('listing.destroy.error')
      end

      head :no_content
    end

    def recover
      listing = Listing.unscoped.find(params[:id])
      if listing.recover
        ScrapeUrlJob.perform_async(listing.url, true)
        flash[:notice] = I18n.t('listing.recover.notice')
      else
        flash[:error] = I18n.t('listing.recover.error')
      end

      head :no_content
    end

    def update_details
      ScrapeUrlJob.perform_async(@listing.url, true)
      flash[:notice] = I18n.t('listing.update_details.notice')
      redirect_to edit_backoffice_listing_path(@listing)
    end

    private

    def find_listing
      @listing = Listing.unscoped.friendly.find(params[:id])
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
                                      :listing_complex_id, :video_link, :kind, :objective, :virtual_tour_url,
                                      features: [], photos: [], stats: {})
    end
  end
end
