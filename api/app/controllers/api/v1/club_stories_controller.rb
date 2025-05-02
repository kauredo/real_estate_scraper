# frozen_string_literal: true

module Api
  module V1
    class ClubStoriesController < Api::V1::BaseController
      include Pagy::Backend

      def index
        club_stories = ClubStory.visible
        paginated = paginate(club_stories)

        render json: {
          club_stories: paginated[:data].map { |story| ClubStorySerializer.new(story).as_json },
          pagination: paginated[:pagination]
        }
      end

      def show
        @club_story = ClubStory.friendly.find(params[:id])
        render json: ClubStorySerializer.new(@club_story, include_photos: true).as_json
      end
    end
  end
end
