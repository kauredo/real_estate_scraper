class AddTenantIdToClubUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :club_users, :tenant, null: true, foreign_key: true
  end
end
