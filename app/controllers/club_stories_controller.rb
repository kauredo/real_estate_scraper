# frozen_string_literal: true

class ClubStoriesController < ApplicationController
  def index
    club_stories = ClubStory.visible
    @club_stories = club_stories.as_json(methods: %i[sample_text main_photo])
  end

  def show
    @club_story = ClubStory.friendly.find(params[:id])
    @resource = {
      path: edit_backoffice_club_story_path(@club_story),
      name: I18n.t('club_stories.resource')
    }

    @club_story_json = @club_story.as_json(
      include: { club_story_photos: { methods: [:image] } }
    )
  end
end
