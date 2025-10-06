class AddTenantIdToListingComplexes < ActiveRecord::Migration[7.1]
  def change
    add_reference :listing_complexes, :tenant, null: true, foreign_key: true
  end
end
