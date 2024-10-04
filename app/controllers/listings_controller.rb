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

    if params[:q].present?
      listings = listings.where("stats->>'Estacionamentos' = ?", params[:q][:Estacionamentos_eq]) if params[:q][:Estacionamentos_eq].present?
      listings = listings.where("stats->>'Quartos' = ?", params[:q][:Quartos_eq]) if params[:q][:Quartos_eq].present?
      listings = listings.where("stats->>'Salas' = ?", params[:q][:Salas_eq]) if params[:q][:Salas_eq].present?
      listings = listings.where("stats->>'Casas de Banho' = ?", params[:q][:'Casas de Banho_eq']) if params[:q][:'Casas de Banho_eq'].present?
      listings = listings.where("stats->>'Área útil' = ?", params[:q][:'Área útil_eq']) if params[:q][:'Área útil_eq'].present?
      listings = listings.where("stats->>'Área bruta (CP)' = ?", params[:q][:'Área bruta (CP)_eq']) if params[:q][:'Área bruta (CP)_eq'].present?
      listings = listings.where("stats->>'Ano de construção' = ?", params[:q][:'Ano de construção_eq']) if params[:q][:'Ano de construção_eq'].present?
      listings = listings.where("stats->>'Área do terreno' = ?", params[:q][:'Área do terreno_eq']) if params[:q][:'Área do terreno_eq'].present?
    end

    pagy, @listings = pagy(listings)
    @pagy = pagy_metadata(pagy)
    @listings_max_price = Listing.all.pluck(:price_cents).uniq.reject(&:blank?).map(&:to_i).max
    @stats_keys = Listing.possible_stats_keys
  end

  def sell; end
end
