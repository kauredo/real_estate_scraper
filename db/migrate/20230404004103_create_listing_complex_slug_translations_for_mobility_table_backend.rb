class CreateListingComplexSlugTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complex_translations, :slug, :text
  end
end
