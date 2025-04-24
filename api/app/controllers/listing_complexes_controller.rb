# frozen_string_literal: true

class ListingComplexesController < ApplicationController
  include Pagy::Backend

  def index
    pagy, @listing_complexes = pagy(ListingComplex.includes(:listings, :photos).where(hidden: false))
    @listing_complexes_json = @listing_complexes.as_json(include: %i[listings photos], methods: :main_photo)
    @pagy = pagy_metadata(pagy)
  end

  def show
    @listing_complex = ListingComplex.includes(:listings, :photos).friendly.find(params[:id])
    @resource = {
      path: edit_backoffice_listing_complex_path(@listing_complex),
      name: I18n.t('enterprises.resource')
    }
    redirect_to latest_path if @listing_complex.hidden? && !current_admin&.confirmed?

    @listing_complex_json = @listing_complex.as_json(include: %i[listings photos], methods: %i[main_photo listing_prices])
  end
end
