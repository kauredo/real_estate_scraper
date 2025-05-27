# frozen_string_literal: true

class BlogPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :main, :blog_post_id, :created_at, :updated_at

  delegate :image, to: :object
  delegate :main, to: :object
  delegate :blog_post_id, to: :object

  belongs_to :blog_post
end
