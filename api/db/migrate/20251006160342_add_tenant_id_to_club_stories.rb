class AddTenantIdToClubStories < ActiveRecord::Migration[7.1]
  def change
    add_reference :club_stories, :tenant, null: true, foreign_key: true
  end
end
