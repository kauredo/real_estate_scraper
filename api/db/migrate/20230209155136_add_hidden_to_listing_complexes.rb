class AddHiddenToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :hidden, :boolean, default: false
  end
end
