class AddSlugToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :slug, :string
    add_index :listing_complexes, :slug, unique: true
  end
end
