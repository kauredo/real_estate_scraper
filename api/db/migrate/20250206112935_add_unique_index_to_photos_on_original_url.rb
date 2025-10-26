class AddUniqueIndexToPhotosOnOriginalUrl < ActiveRecord::Migration[7.0]
  def change
    add_index :photos, :original_url, unique: true, where: "original_url IS NOT NULL"
  end
end
