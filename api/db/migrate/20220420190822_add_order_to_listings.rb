# frozen_string_literal: true

class AddOrderToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :order, :integer
  end
end
