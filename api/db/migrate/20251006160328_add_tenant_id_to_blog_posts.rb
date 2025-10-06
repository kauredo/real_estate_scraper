class AddTenantIdToBlogPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :blog_posts, :tenant, null: true, foreign_key: true
  end
end
