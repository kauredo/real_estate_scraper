class AddNewFormatToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :new_format, :boolean, default: false
  end
end
