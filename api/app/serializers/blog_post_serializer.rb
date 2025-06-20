# frozen_string_literal: true

class BlogPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :slug_en, :small_description, :text, :sanitized_text,
             :sample_text, :video_link, :meta_title, :meta_description, :hidden,
             :created_at, :updated_at, :main_photo

  has_many :blog_photos, serializer: BlogPhotoSerializer, if: :include_photos?

  delegate :sanitized_text, to: :object
  delegate :sample_text, to: :object
  delegate :main_photo, to: :object

  def include_photos?
    @instance_options[:include_photos]
  end
end

# == Schema Information
#
# Table name: blog_posts
#
#  id                :bigint           not null, primary key
#  hidden            :boolean          default(TRUE)
#  meta_description  :text
#  meta_title        :text
#  slug              :string
#  small_description :text
#  text              :text
#  title             :string
#  video_link        :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_blog_posts_on_slug  (slug) UNIQUE
#
