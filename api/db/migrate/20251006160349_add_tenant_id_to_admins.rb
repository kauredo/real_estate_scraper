class AddTenantIdToAdmins < ActiveRecord::Migration[7.1]
  def change
    add_reference :admins, :tenant, null: true, foreign_key: true
  end
end
