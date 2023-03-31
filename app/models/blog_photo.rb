class BlogPhoto < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :blog_post
  after_save :update_main

  def update_main
    return unless saved_change_to_main? && main

    photos = BlogPhoto.where(blog_post_id:).where.not(id:)
    photos.update_all(main: false)
  end
end
