class AddTenantIdToListings < ActiveRecord::Migration[7.1]
  def change
    add_reference :listings, :tenant, null: true, foreign_key: true
    add_index :listings, [:tenant_id, :status]
    add_index :listings, [:tenant_id, :created_at]
  end
end
