class AddAgencyFieldsToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :agency_name, :string
    add_column :tenants, :website_url, :string
    add_column :tenants, :phone, :string
    add_column :tenants, :address, :text
  end
end
