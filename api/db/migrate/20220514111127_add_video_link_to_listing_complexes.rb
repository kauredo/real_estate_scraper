# frozen_string_literal: true

class AddVideoLinkToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :video_link, :string
  end
end
