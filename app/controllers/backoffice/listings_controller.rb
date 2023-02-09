# frozen_string_literal: true

module Backoffice
  class ListingsController < BackofficeController
    before_action :find_listing, except: %i[index create]
    include Pagy::Backend

    def index
      @listings = Listing.all
    end

    def create
      if listing_params[:url].present? && listing_params[:url].starts_with?('https://www.kwportugal.pt/')
        ActiveRecord::Base.transaction do
          listing = Listing.find_or_create_by(url: listing_params[:url])
          ScrapeUrlJob.perform_later(listing.id)
          flash[:notice] = I18n.t('listing.create.notice')
        end
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

      @listing.update(new_params)
      flash[:notice] = I18n.t('listing.update.notice')
      redirect_to edit_backoffice_listing_path(@listing)
    end

    def destroy
      @listing.destroy
    end

    def update_details
      ScrapeUrlJob.perform_later(@listing.id)
      flash[:notice] = I18n.t('listing.update_details.notice')
      redirect_to backoffice_listing_path(@listing)
    end

    private

    def find_listing
      @listing = Listing.find(params[:id])
    end

    def listing_params
      params.require(:listing).permit(:address, :price, :title, :order, :url, :description, :status, :status_changed_at,
                                      :listing_complex_id, :video_link, features: [], photos: [], stats: {})
    end
  end
end
