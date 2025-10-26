class CreateClubStoryTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    create_table :club_story_translations do |t|
      # Translated attribute(s)
      t.text :title
      t.text :text
      t.text :slug

      t.string  :locale, null: false
      t.references :club_story, null: false, foreign_key: true, index: false

      t.timestamps null: false
    end

    add_index :club_story_translations, :locale, name: :index_club_story_translations_on_locale
    add_index :club_story_translations, [:club_story_id, :locale], 
             name: :index_club_story_translations_on_club_story_id_and_locale, 
             unique: true
  end
end
