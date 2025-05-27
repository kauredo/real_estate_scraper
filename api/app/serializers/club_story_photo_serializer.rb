# frozen_string_literal: true

class ClubStoryPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :main, :club_story_id, :created_at, :updated_at

  delegate :image, to: :object
  delegate :main, to: :object
  delegate :club_story_id, to: :object

  belongs_to :club_story
end
