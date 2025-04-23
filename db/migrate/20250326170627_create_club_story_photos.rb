# frozen_string_literal: true

class CreateClubStoryPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :club_story_photos do |t|
      t.text :image
      t.boolean :main, default: false
      t.references :club_story
      t.timestamps
    end
  end
end
