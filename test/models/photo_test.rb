# frozen_string_literal: true

require 'test_helper'

class PhotoTest < ActiveSupport::TestCase
  def setup
    @listing_complex = listing_complexes(:one)
    @photo = @listing_complex.photos.create(image: "#{fixture_path}files/photo.webp")
  end

  test 'photo should be valid' do
    assert @photo.valid?
  end

  test 'listing_complex_id should be present' do
    @photo.listing_complex_id = nil
    assert_not @photo.valid?
  end

  test 'main should be present' do
    @photo.main = nil
    assert_not @photo.valid?
  end

  test 'order should be unique within the scope of the listing_complex_id' do
    existing_photo = @listing_complex.photos.create(main: true, order: 1)
    old_order = existing_photo.order
    new_photo = @listing_complex.photos.create(main: true)
    new_photo.update(order: old_order)
    assert existing_photo.reload.order == old_order + 1
  end

  test 'update_main should set all other photos in the listing complex to false when main is true' do
    photo2 = @listing_complex.photos.create(image: "#{fixture_path}files/photo.webp")
    photo2.update!(main: true)

    assert photo2.main
    assert_not @photo.reload.main

    @photo.update!(main: true)
    assert @photo.main
    assert_not photo2.reload.main
  end

  test 'update_main should not update other photos in different listing complexes' do
    listing_complex2 = listing_complexes(:two)
    photo2 = listing_complex2.photos.create(image: "#{fixture_path}files/photo.webp", main: true)
    @photo.update!(main: true)
    assert photo2.reload.main
  end

  test "update_orders should update the order of all photos in the listing complex when a photo's order changes" do
    photo1 = @listing_complex.photos.create
    photo2 = @listing_complex.photos.create(order: 2)
    @photo.update!(order: 2)
    assert_equal [@photo, photo2, photo1], @listing_complex.photos.reload.to_a
  end

  test 'update_orders should not update the order of photos in other listing complexes' do
    listing_complex2 = listing_complexes(:two)
    photo1 = listing_complex2.photos.create(image: "#{fixture_path}files/photo.webp", order: 1)
    photo2 = listing_complex2.photos.create(image: "#{fixture_path}files/photo.webp", order: 2)
    @photo.update!(order: 2)
    assert_equal [photo1, photo2], listing_complex2.photos.reload.to_a
  end
end
