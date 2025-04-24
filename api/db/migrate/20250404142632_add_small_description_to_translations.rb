class AddSmallDescriptionToTranslations < ActiveRecord::Migration[7.1]
  def change
    add_column :club_story_translations, :small_description, :text
    add_column :blog_post_translations, :small_description, :text
    # change club_story original column type from string to text
    change_column :club_stories, :small_description, :text
    # change blog_post original column type from string to text
    change_column :blog_posts, :small_description, :text
  end
end
