class CreateListingComplexSubtextAndFinalTextTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_complex_translations, :subtext, :text
    add_column :listing_complex_translations, :final_text, :text
  end
end
