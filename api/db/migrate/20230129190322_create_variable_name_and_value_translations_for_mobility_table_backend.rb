class CreateVariableNameAndValueTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    create_table :variable_translations do |t|

      # Translated attribute(s)
      t.text :name
      t.text :value

      t.string  :locale, null: false
      t.references :variable, null: false, foreign_key: true, index: false

      t.timestamps null: false
    end

    add_index :variable_translations, :locale, name: :index_variable_translations_on_locale
    add_index :variable_translations, [:variable_id, :locale], name: :index_variable_translations_on_variable_id_and_locale, unique: true

  end
end
