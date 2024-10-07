# frozen_string_literal: true

class PopulateTypeAndObjective < ActiveRecord::Migration[7.0]
  def up
    Listing.find_each do |listing|
      listing.populate_type_and_objective!
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
