class ListingComplexesController < ApplicationController
  include Pagy::Backend

  def index
    pagy, @listing_complexes = pagy(ListingComplex.all)
    @pagy = pagy_metadata(pagy)
  end

  def show
    @listing_complex = ListingComplex.preload(:listings).find(params[:id])
  end
end
