class AddTenantIdToBlogPhotos < ActiveRecord::Migration[7.1]
  def change
    add_reference :blog_photos, :tenant, null: true, foreign_key: true
  end
end
