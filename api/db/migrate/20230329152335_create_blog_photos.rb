class CreateBlogPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :blog_photos do |t|
      t.text :image
      t.boolean :main, default: false
      t.references :blog_post
      t.timestamps
    end
  end
end
