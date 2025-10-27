class AddEmailConfigToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :frontend_url, :string
    add_column :tenants, :from_email, :string
    add_column :tenants, :reply_to_email, :string
    add_column :tenants, :email_branding, :jsonb, default: {}, null: false
  end
end
