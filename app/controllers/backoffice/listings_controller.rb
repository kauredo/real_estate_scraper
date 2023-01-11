class Backoffice::ListingsController < BackofficeController
  skip_before_action :verify_authenticity_token, only: [:destroy]
  before_action :find_listing, except: [:index]
  include Pagy::Backend

  def index
    @listings = Listing.preload(:colleague).all
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
