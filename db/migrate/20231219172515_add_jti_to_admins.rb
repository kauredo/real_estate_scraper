class AddJtiToAdmins < ActiveRecord::Migration[7.0]
  def change
    add_column :admins, :jti, :string, null: false
    add_index :admins, :jti, unique: true
  end
end
