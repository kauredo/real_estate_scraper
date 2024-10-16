# frozen_string_literal: true

class SetDefaultToSale < ActiveRecord::Migration[7.0]
  def up
    Listing.where(objective: 0).update_all(objective: 1)
  end

  def down
    true
  end
end
