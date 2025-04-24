# frozen_string_literal: true

class ClubStorySerializer
  def initialize(club_story, include_photos: false)
    @club_story = club_story
    @include_photos = include_photos
  end

  def as_json
    json = {
      id: @club_story.id,
      title: @club_story.title,
      slug: @club_story.slug,
      small_description: @club_story.small_description,
      text: @club_story.text,
      sanitized_text: @club_story.sanitized_text,
      sample_text: @club_story.sample_text,
      video_link: @club_story.video_link,
      meta_title: @club_story.meta_title,
      meta_description: @club_story.meta_description,
      hidden: @club_story.hidden,
      created_at: @club_story.created_at,
      updated_at: @club_story.updated_at,
      main_photo: @club_story.main_photo
    }

    if @include_photos
      json[:club_story_photos] = @club_story.club_story_photos.map do |photo|
        {
          id: photo.id,
          image_url: photo.image.url,
          main: photo.main
        }
      end
    end

    json
  end
end
