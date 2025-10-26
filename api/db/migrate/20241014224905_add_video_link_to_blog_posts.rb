class AddVideoLinkToBlogPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :blog_posts, :video_link, :string
  end
end
