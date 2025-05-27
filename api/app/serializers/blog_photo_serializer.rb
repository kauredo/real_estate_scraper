# frozen_string_literal: true

class BlogPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :main, :blog_post_id, :created_at, :updated_at

  delegate :image, to: :object
  delegate :main, to: :object
  delegate :blog_post_id, to: :object

  belongs_to :blog_post
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
