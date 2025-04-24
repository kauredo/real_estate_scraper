class AddVideoLinkToClubStories < ActiveRecord::Migration[7.0]
  def change
    add_column :club_stories, :video_link, :string
  end
end
