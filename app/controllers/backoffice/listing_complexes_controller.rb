class Backoffice::ListingComplexesController < BackofficeController
  before_action :find_listing_complex, except: [:index, :new, :create]
  include Pagy::Backend

  def index
    @listing_complexes = ListingComplex.all
  end

  def new
    @listing_complex = ListingComplex.new
  end

  def create
    binding.pry
    @listing_complex = ListingComplex.new(listing_complex_params)
    if @listing_complex.save
      redirect_to backoffice_listing_complexes_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    @listing_complex.update(listing_complex_params)
    redirect_to backoffice_listing_complexes_path
  end

  def destroy
    @listing_complex.destroy
  end

  private

  def find_listing_complex
    @listing_complex = ListingComplex.find(params[:id])
  end

  def listing_complex_params
    params.require(:listing_complex).permit(:name, :description)
  end
end

