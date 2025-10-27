class AddAgencyFieldsToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :agency_name, :string unless column_exists? :tenants, :agency_name
    add_column :tenants, :website_url, :string unless column_exists? :tenants, :website_url
    add_column :tenants, :phone, :string unless column_exists? :tenants, :phone
    add_column :tenants, :address, :text unless column_exists? :tenants, :address
  end
end
