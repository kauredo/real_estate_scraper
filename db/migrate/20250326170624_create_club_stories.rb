class CreateClubStories < ActiveRecord::Migration[7.0]
  def change
    create_table :club_stories do |t|
      t.string :title
      t.text :text
      t.boolean :hidden
      t.text :meta_title
      t.text :meta_description
      t.string :slug
    end
    add_index :club_stories, :slug, unique: true
  end
end
