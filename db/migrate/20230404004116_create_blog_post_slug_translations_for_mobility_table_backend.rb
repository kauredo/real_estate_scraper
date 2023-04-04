class CreateBlogPostSlugTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    add_column :blog_post_translations, :slug, :text
  end
end
