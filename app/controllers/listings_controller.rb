class ListingsController < ApplicationController
  def show
    @listing = Listing.find(params[:id])
  end

  def latest
    @listings = Listing.latest
  end

  def buy
    @listings = Listing.all
  end

  def sell
  end
end
