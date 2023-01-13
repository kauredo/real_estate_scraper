class CreateListingComplexNameAndDescriptionTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    create_table :listing_complex_translations do |t|

      # Translated attribute(s)
      t.string :name
      t.text :description

      t.string  :locale, null: false
      t.references :listing_complex, null: false, foreign_key: true, index: false

      t.timestamps null: false
    end

    add_index :listing_complex_translations, :locale, name: :index_listing_complex_translations_on_locale
    add_index :listing_complex_translations, [:listing_complex_id, :locale], name: :index_08ff862f275e86f460eb017836002c84b1ca958b, unique: true

  end
end
