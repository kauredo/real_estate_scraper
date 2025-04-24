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
