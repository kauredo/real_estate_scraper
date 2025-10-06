class AddTenantIdToPhotos < ActiveRecord::Migration[7.1]
  def change
    add_reference :photos, :tenant, null: true, foreign_key: true
  end
end
