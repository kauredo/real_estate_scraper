class AddStatusChangedAtToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :status_changed_at, :datetime
  end
end
