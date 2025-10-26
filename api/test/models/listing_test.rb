# frozen_string_literal: true

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  setup do
    @listing = listings(:one)
    @listing2 = listings(:two)
  end

  test 'should order by order, status and created_at by default' do
    assert_equal [@listing, @listing2], Listing.first(2)
  end

  test 'should return listings with order above given value' do
    assert_equal [@listing], Listing.where.not(order: nil) - Listing.with_order_above(2)
  end

  test 'should group listings by geography' do
    assert_equal({ 'Sul' => [@listing, @listing2], 'Norte' => [listings(:fourteen)] }, Listing.where(id: [107, 105, 33]).by_geography)
  end

  test 'should determine city based on address' do
    assert_equal 'Norte', Listing.new(address: 'Rua do Norte, 1, Porto').city
    assert_equal 'Sul', Listing.new(address: 'Rua do Sul, 1, Faro').city
  end

  test 'should update orders after save' do
    listing1 = listings(:one)
    listing2 = listings(:two)
    listing3 = listings(:three)
    listing1.update(order: 3)
    listing2.update(order: 2)
    listing3.update(order: 1)
    assert_equal [listing3, listing2, listing1], Listing.first(3)
    listing2.update(order: 4)
    assert_equal [listing3, listing1, listing2], Listing.first(3)
  end
end

# == Schema Information
#
# Table name: listings
#
#  id                 :bigint           not null, primary key
#  address            :string
#  deleted_at         :datetime
#  description        :text
#  features           :string           default([]), is an Array
#  kind               :integer          default("other"), not null
#  objective          :integer          default("other"), not null
#  old_status         :string
#  order              :integer
#  photos             :text             default([]), is an Array
#  price_cents        :integer          default(0), not null
#  slug               :string
#  stats              :json
#  status             :integer
#  status_changed_at  :datetime
#  title              :string
#  url                :string
#  video_link         :string
#  virtual_tour_url   :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  listing_complex_id :bigint
#  tenant_id          :bigint
#
# Indexes
#
#  index_listings_on_deleted_at                (deleted_at)
#  index_listings_on_listing_complex_id        (listing_complex_id)
#  index_listings_on_slug                      (slug) UNIQUE
#  index_listings_on_tenant_id                 (tenant_id)
#  index_listings_on_tenant_id_and_created_at  (tenant_id,created_at)
#  index_listings_on_tenant_id_and_status      (tenant_id,status)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
