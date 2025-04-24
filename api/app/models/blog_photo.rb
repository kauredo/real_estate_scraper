# frozen_string_literal: true

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

# == Schema Information
#
# Table name: blog_photos
#
#  id           :bigint           not null, primary key
#  image        :text
#  main         :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  blog_post_id :bigint
#
# Indexes
#
#  index_blog_photos_on_blog_post_id  (blog_post_id)
#
