class AddMoreTextsToListingComplexes < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complexes, :subtext, :text
    add_column :listing_complexes, :final_text, :text
  end
end
