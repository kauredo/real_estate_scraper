# frozen_string_literal: true

class ListingComplexSerializer
  def initialize(listing_complex, include_listings: false)
    @listing_complex = listing_complex
    @include_listings = include_listings
  end

  def as_json
    json = {
      id: @listing_complex.id,
      name: @listing_complex.name,
      slug: @listing_complex.slug,
      description: @listing_complex.description,
      subtext: @listing_complex.subtext,
      final_text: @listing_complex.final_text,
      order: @listing_complex.order,
      url: @listing_complex.url,
      video_link: @listing_complex.video_link,
      new_format: @listing_complex.new_format,
      hidden: @listing_complex.hidden,
      created_at: @listing_complex.created_at,
      updated_at: @listing_complex.updated_at,
      photos: @listing_complex.photos.map do |photo|
        {
          id: photo.id,
          image_url: photo.image.url,
          main: photo.main,
          order: photo.order
        }
      end,
      main_photo: @listing_complex.main_photo ? @listing_complex.main_photo.image.url : nil,
      listing_prices: @listing_complex.listing_prices
    }

    if @include_listings
      json[:listings] = @listing_complex.listings.map do |listing|
        ListingSerializer.new(listing).as_json
      end
    end

    json
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
#
# Indexes
#
#  index_listing_complexes_on_slug  (slug) UNIQUE
#
