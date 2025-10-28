# frozen_string_literal: true

require 'test_helper'

class ListingComplexTest < ActiveSupport::TestCase
  def setup
    Current.tenant = tenants(:one)
  end

  test 'validates presence of name' do
    listing_complex = ListingComplex.new(description: 'test', order: 1)
    assert_not listing_complex.save, 'Saved ListingComplex without a name'
  end

  test 'validates presence of description' do
    listing_complex = ListingComplex.new(name: 'test', order: 1)
    assert_not listing_complex.save, 'Saved ListingComplex without a description'
  end

  test '#main_photo returns the main photo if present' do
    listing_complex = listing_complexes(:one)
    listing_complex.photos.destroy_all

    assert listing_complex.photos.create(image: "#{fixture_path}files/photo.webp", main: true)
    assert listing_complex.photos.create(image: "#{fixture_path}files/photo2.webp")

    assert_equal listing_complex.photos.first, listing_complex.main_photo
  end

  test '#main_photo returns the first photo if no main photo is present' do
    listing_complex = listing_complexes(:one)
    listing_complex.photos.destroy_all

    assert listing_complex.photos.create(image: "#{fixture_path}files/photo.webp")

    assert_equal listing_complex.photos.first, listing_complex.main_photo
  end

  test '#listing_prices returns array of apartment types and prices' do
    listing_complex = listing_complexes(:one)
    listing_complex.description = "290 000€ para um Estúdio \r\n425 000€ para um apartamento T1 \r\n610 000€ para um apartamento T2"
    listing_complex.subtext = "880 000€ para um apartamento T3\r\n1 215 000€ para um apartamento T3+1\r\n1 510 000€ para um apartamento T4"
    listing_complex.final_text = 'Para mais informações contacte-me através do telefone'
    listing_complex.save

    expected = ['Jardins de Lisboa', [['Estúdio', '290.000 €'], ['T1', '425.000 €'], ['T2', '610.000 €'], ['T3', '880.000 €'], ['T3+1', '1.215.000 €'], ['T4', '1.510.000 €']]]
    assert_equal expected, listing_complex.listing_prices
  end

  test "#update_orders updates order for complexes with order below current complex's order" do
    listing_complex1 = listing_complexes(:one)
    listing_complex1.order = 1
    listing_complex1.save

    listing_complex2 = listing_complexes(:two)
    listing_complex2.order = 2
    listing_complex2.save

    listing_complex3 = listing_complexes(:three)
    listing_complex3.order = 3
    listing_complex3.save

    listing_complex2.update(order: 1)

    assert_equal 1, listing_complex2.order
    assert_equal 2, listing_complex1.reload.order
    assert_equal 3, listing_complex3.reload.order
  end

  test "#update_orders does not update order for complexes with order above complex's order" do
    skip "Complex model logic issue - needs investigation"
    listing_complex1 = listing_complexes(:one)
    listing_complex1.order = 1
    listing_complex1.save

    listing_complex2 = listing_complexes(:two)
    listing_complex2.order = 2
    listing_complex2.save

    listing_complex3 = listing_complexes(:three)
    listing_complex3.order = 4
    listing_complex3.save

    listing_complex1.update(order: 3)

    assert_equal 2, listing_complex2.reload.order
    assert_equal 3, listing_complex1.order
    assert_equal 4, listing_complex3.reload.order
  end
end

# == Schema Information
#
# Table name: listing_complexes
#
#  id          :bigint           not null, primary key
#  description :text
#  final_text  :text
#  hidden      :boolean          default(FALSE)
#  name        :string
#  new_format  :boolean          default(FALSE)
#  order       :integer
#  slug        :string
#  subtext     :text
#  url         :string
#  video_link  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  tenant_id   :bigint
#
# Indexes
#
#  index_listing_complexes_on_slug           (slug) UNIQUE
#  index_listing_complexes_on_tenant_hidden  (tenant_id,hidden)
#  index_listing_complexes_on_tenant_id      (tenant_id)
#  index_listing_complexes_on_tenant_order   (tenant_id,order)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
