# frozen_string_literal: true

class AddColleagueIdToListings < ActiveRecord::Migration[7.0]
  def change
    add_reference :listings, :colleague
  end
end
