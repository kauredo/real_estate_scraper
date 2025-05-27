# frozen_string_literal: true

class ClubStorySerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :small_description, :text, :sanitized_text,
             :sample_text, :video_link, :meta_title, :meta_description, :hidden,
             :created_at, :updated_at, :main_photo

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
#
# Indexes
#
#  index_club_stories_on_slug  (slug) UNIQUE
#
