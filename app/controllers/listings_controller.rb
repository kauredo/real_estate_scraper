# frozen_string_literal: true

class ListingsController < ApplicationController
  include Pagy::Backend

  def show
    @listing = Listing.friendly.find(params[:id])
    @resource = {
      path: edit_backoffice_listing_path(@listing),
      name: I18n.t('listing.resource')
    }
  end

  def buy
    @q = Listing.ransack(params[:q])
    listings = @q.result
    pagy, @listings = pagy(listings)
    @pagy = pagy_metadata(pagy)
    @listings_max_price = Listing.all.pluck(:price_cents).uniq.reject(&:blank?).map(&:to_i).max / 100
  end

  def sell; end
end
