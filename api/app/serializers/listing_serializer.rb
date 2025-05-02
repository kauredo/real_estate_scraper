# frozen_string_literal: true

class ListingSerializer
  def initialize(listing)
    @listing = listing
  end

  def as_json
    {
      id: @listing.id,
      title: @listing.title,
      slug: @listing.slug,
      description: @listing.description,
      address: @listing.address,
      price: @listing.price ? @listing.price.format(symbol: nil, no_cents_if_whole: true) : nil,
      price_cents: @listing.price_cents,
      status: @listing.status,
      objective: @listing.objective,
      kind: @listing.kind,
      features: @listing.features,
      stats: @listing.stats,
      url: @listing.url,
      video_link: @listing.video_link,
      virtual_tour_url: @listing.virtual_tour_url,
      photos: @listing.photos,
      listing_complex_id: @listing.listing_complex_id,
      city: @listing.city,
      created_at: @listing.created_at,
      updated_at: @listing.updated_at
    }
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
#
# Indexes
#
#  index_listings_on_deleted_at          (deleted_at)
#  index_listings_on_listing_complex_id  (listing_complex_id)
#  index_listings_on_slug                (slug) UNIQUE
#
