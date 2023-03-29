class BlogPhoto < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :blog_post
end
