# frozen_string_literal: true

class ClubStoryPhoto < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :club_story
  after_save :update_main

  def update_main
    return unless saved_change_to_main? && main

    photos = ClubStoryPhoto.where(club_story_id:).where.not(id:)
    photos.update_all(main: false)
  end
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
