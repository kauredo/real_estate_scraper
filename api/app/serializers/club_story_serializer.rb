# frozen_string_literal: true

class ClubStorySerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :small_description, :text, :sanitized_text,
             :sample_text, :video_link, :meta_title, :meta_description, :hidden,
             :created_at, :updated_at, :main_photo, :main_photo_thumb, :main_photo_medium

  has_many :club_story_photos, serializer: ClubStoryPhotoSerializer, if: :include_photos?

  delegate :title, to: :object
  delegate :slug, to: :object
  delegate :small_description, to: :object
  delegate :text, to: :object
  delegate :sanitized_text, to: :object
  delegate :sample_text, to: :object
  delegate :video_link, to: :object
  delegate :meta_title, to: :object
  delegate :meta_description, to: :object
  delegate :hidden, to: :object
  delegate :main_photo, to: :object

  def main_photo_thumb
    return object.main_photo unless object.club_story_photos.present?

    main_club_photo = object.club_story_photos.select(&:main).first || object.club_story_photos.first
    main_club_photo.image.thumb.url
  rescue StandardError
    object.main_photo
  end

  def main_photo_medium
    return object.main_photo unless object.club_story_photos.present?

    main_club_photo = object.club_story_photos.select(&:main).first || object.club_story_photos.first
    main_club_photo.image.medium.url
  rescue StandardError
    object.main_photo
  end

  def include_photos?
    @instance_options[:include_photos]
  end
end

# == Schema Information
#
# Table name: club_stories
#
#  id                :bigint           not null, primary key
#  hidden            :boolean
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
#  index_club_stories_on_slug       (slug) UNIQUE
#  index_club_stories_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
