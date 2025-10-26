class AddOriginalUrlToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :original_url, :string
  end
end
