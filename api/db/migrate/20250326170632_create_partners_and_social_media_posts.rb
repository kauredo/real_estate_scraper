class CreatePartnersAndSocialMediaPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :partners do |t|
      t.string :name
      t.timestamps
    end

    create_table :social_media_posts do |t|
      t.string :url, null: false
      t.references :partner, foreign_key: true
      t.timestamps
    end
  end
end
