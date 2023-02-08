class PhotosController < ApplicationController
  def destroy
    photo = Photo.find(params[:id])
    listing_complex = photo.listing_complex
    photo.destroy!
    redirect_to edit_backoffice_listing_complex_path(listing_complex), status: :see_other
  end
end
