class AddOrderToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :order, :integer
  end
end
