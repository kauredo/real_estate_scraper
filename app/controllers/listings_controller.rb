# frozen_string_literal: true

class ListingsController < ApplicationController
  include Pagy::Backend

  def show
    @listing = Listing.find(params[:id])
    @resource = {
      path: edit_backoffice_listing_path(@listing),
      name: I18n.t('listing.resource')
    }
  end

  def buy
    pagy, @listings = pagy(Listing.all)
    @pagy = pagy_metadata(pagy)
  end

  def sell; end
end
