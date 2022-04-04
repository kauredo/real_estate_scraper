class Backoffice::ListingsController < BackofficeController
  skip_before_action :verify_authenticity_token, only: [:destroy]
  before_action :find_listing, except: [:index]
  include Pagy::Backend

  def index
    @listings = Listing.preload(:colleague).all
  end

  def edit
  end

  def update
    @listing.update(listing_params)
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
    params.require(:listing).permit(:address, :price, :title, :url, :description, :status, :listing_complex_id, features: [], photos: [], stats: {})
  end
end

