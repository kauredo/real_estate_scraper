class AddSmallDescriptionToBlog < ActiveRecord::Migration[7.1]
  def change
    add_column :blog_posts, :small_description, :string
  end
end
