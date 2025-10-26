class AddKindAndObjectiveToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :kind, :integer, null: false, default: 0
    add_column :listings, :objective, :integer, null: false, default: 0
  end
end
