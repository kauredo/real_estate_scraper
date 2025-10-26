class AddTenantIdToVariables < ActiveRecord::Migration[7.1]
  def change
    add_reference :variables, :tenant, null: true, foreign_key: true
  end
end
