class CreateTenants < ActiveRecord::Migration[7.1]
  def change
    return if table_exists? :tenants

    create_table :tenants do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :api_key, null: false
      t.jsonb :features, default: {}, null: false
      t.jsonb :metadata, default: {}, null: false
      t.string :domain
      t.string :contact_email
      t.boolean :active, default: true, null: false

      t.timestamps

      t.index :api_key, unique: true
      t.index :slug, unique: true
      t.index :domain
      t.index :active
    end
  end
end
