class CreateBlogPostTitleAndTextTranslationsForMobilityTableBackend < ActiveRecord::Migration[7.0]
  def change
    create_table :blog_post_translations do |t|

      # Translated attribute(s)
      t.text :title
      t.text :text

      t.string  :locale, null: false
      t.references :blog_post, null: false, foreign_key: true, index: false

      t.timestamps null: false
    end

    add_index :blog_post_translations, :locale, name: :index_blog_post_translations_on_locale
    add_index :blog_post_translations, [:blog_post_id, :locale], name: :index_blog_post_translations_on_blog_post_id_and_locale, unique: true

  end
end
