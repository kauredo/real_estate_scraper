class AddStatusToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :status, :string
  end
end
