class AddTenantIdToClubStoryPhotos < ActiveRecord::Migration[7.1]
  def change
    add_reference :club_story_photos, :tenant, null: true, foreign_key: true
  end
end
