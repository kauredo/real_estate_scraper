class RemoveColleagueIdFromListings < ActiveRecord::Migration[7.0]
  def change
    remove_reference :listings, :colleague
  end
end
