class AddUrlToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :url, :string
  end
end
