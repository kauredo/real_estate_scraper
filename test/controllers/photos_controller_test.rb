require 'test_helper'

class PhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @file = fixture_file_upload('photo.webp', 'image/webp')
    @listing_complex = listing_complexes(:one)

    @photo = Photo.create(image: @file, listing_complex: @listing_complex, order: 1)
  end

  test 'should destroy photo' do
    assert_difference('Photo.count', -1) do
      delete photo_url(@photo, locale: I18n.locale)
    end

    assert_redirected_to edit_backoffice_listing_complex_path(@listing_complex)
  end
end
