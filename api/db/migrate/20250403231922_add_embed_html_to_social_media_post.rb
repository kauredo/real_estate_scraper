class AddEmbedHtmlToSocialMediaPost < ActiveRecord::Migration[7.1]
  def change
    add_column :social_media_posts, :embed_html, :text
  end
end
