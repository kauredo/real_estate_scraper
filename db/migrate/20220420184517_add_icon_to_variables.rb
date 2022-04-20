class AddIconToVariables < ActiveRecord::Migration[7.0]
  def change
    add_column :variables, :icon, :string
  end
end
