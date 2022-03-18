class ListingsController < ApplicationController
  include Pagy::Backend

  def show
    @listing = Listing.find(params[:id])
  end

  def buy
    pagy, @listings = pagy(Listing.all.where(colleague: nil))
    @pagy = pagy_metadata(pagy)
  end

  def sell
  end
end
