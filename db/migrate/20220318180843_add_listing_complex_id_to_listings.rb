# frozen_string_literal: true

class AddListingComplexIdToListings < ActiveRecord::Migration[7.0]
  def change
    add_reference :listings, :listing_complex
  end
end
