class AddMetaFieldsToBlogPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :blog_posts, :meta_title, :text
    add_column :blog_posts, :meta_description, :text
  end
end
