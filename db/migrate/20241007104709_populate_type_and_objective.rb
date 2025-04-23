# frozen_string_literal: true

class PopulateTypeAndObjective < ActiveRecord::Migration[7.0]
  def up
    Listing.find_each do |listing|
      if listing.objective.nil? || listing.kind.nil?
        listing.populate_type_and_objective!
      end
    end
  end

  def down
    true
  end
end
