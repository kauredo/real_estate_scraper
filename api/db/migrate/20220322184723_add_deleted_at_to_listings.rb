# frozen_string_literal: true

class AddDeletedAtToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :deleted_at, :datetime
    add_index :listings, :deleted_at
  end
end
