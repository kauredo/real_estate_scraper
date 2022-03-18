class ListingComplexesController < ApplicationController
  include Pagy::Backend

  def index
    pagy, @listing_complexes = pagy(ListingComplex.all)
    @pagy = pagy_metadata(pagy)
  end
end
