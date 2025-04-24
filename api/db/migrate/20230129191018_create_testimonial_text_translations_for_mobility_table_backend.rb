class CreateTestimonialTextTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    create_table :testimonial_translations do |t|

      # Translated attribute(s)
      t.text :text

      t.string  :locale, null: false
      t.references :testimonial, null: false, foreign_key: true, index: false

      t.timestamps null: false
    end

    add_index :testimonial_translations, :locale, name: :index_testimonial_translations_on_locale
    add_index :testimonial_translations, [:testimonial_id, :locale], name: :index_testimonial_translations_on_testimonial_id_and_locale, unique: true

  end
end
