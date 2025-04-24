class AddVirtualTourUrlToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :virtual_tour_url, :string
  end
end
