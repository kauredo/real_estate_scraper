# frozen_string_literal: true

module Backoffice
  class ListingsController < BackofficeController
    skip_before_action :verify_authenticity_token, only: [:destroy]
    before_action :find_listing, except: [:index, :create]
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
        flash[:error] =  I18n.t('listing.create.error')
      end
      redirect_to(backoffice_path)
    end

    def edit; end

    def update
      new_params = listing_params.dup
      if new_params[:status] != @listing.status
        new_params[:status_changed_at] = (Time.zone.now if new_params[:status] == 'Vendido')
      end

      @listing.update(new_params)
      redirect_to backoffice_listings_path
    end

    def destroy
      @listing.destroy
    end

    private

    def find_listing
      @listing = Listing.find(params[:id])
    end

    def listing_params
      params.require(:listing).permit(:address, :price, :title, :order, :url, :description, :status, :status_changed_at,
                                      :listing_complex_id, features: [], photos: [], stats: {})
    end
  end
end
