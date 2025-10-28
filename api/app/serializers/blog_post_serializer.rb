# frozen_string_literal: true

class BlogPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :slug_en, :small_description, :text, :sanitized_text,
             :sample_text, :video_link, :meta_title, :meta_description, :hidden,
             :created_at, :updated_at, :main_photo, :main_photo_thumb, :main_photo_medium

  has_many :blog_photos, serializer: BlogPhotoSerializer, if: :include_photos?

  delegate :sanitized_text, to: :object
  delegate :sample_text, to: :object
  delegate :main_photo, to: :object

  def main_photo_thumb
    return object.main_photo if object.blog_photos.blank?

    main_blog_photo = object.blog_photos.select(&:main).first || object.blog_photos.first
    main_blog_photo.image.thumb.url
  rescue StandardError
    object.main_photo
  end

  def main_photo_medium
    return object.main_photo if object.blog_photos.blank?

    main_blog_photo = object.blog_photos.select(&:main).first || object.blog_photos.first
    main_blog_photo.image.medium.url
  rescue StandardError
    object.main_photo
  end

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
#  tenant_id         :bigint
#
# Indexes
#
#  index_blog_posts_on_slug            (slug) UNIQUE
#  index_blog_posts_on_tenant_created  (tenant_id,created_at DESC)
#  index_blog_posts_on_tenant_hidden   (tenant_id,hidden)
#  index_blog_posts_on_tenant_id       (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
