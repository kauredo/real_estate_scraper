class CreateListingSlugTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_translations, :slug, :text
  end
end
