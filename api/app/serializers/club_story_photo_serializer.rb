# frozen_string_literal: true

class ClubStoryPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :main, :club_story_id, :created_at, :updated_at

  delegate :image, to: :object
  delegate :main, to: :object
  delegate :club_story_id, to: :object

  belongs_to :club_story
end

# == Schema Information
#
# Table name: club_story_photos
#
#  id            :bigint           not null, primary key
#  image         :text
#  main          :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  club_story_id :bigint
#
# Indexes
#
#  index_club_story_photos_on_club_story_id  (club_story_id)
#
