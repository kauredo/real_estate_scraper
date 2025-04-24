class AddSmallDescriptionToClubStories < ActiveRecord::Migration[7.1]
  def change
    add_column :club_stories, :small_description, :string
  end
end
