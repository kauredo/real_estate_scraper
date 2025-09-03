# frozen_string_literal: true

module Api
  module V1
    class ClubStoriesController < Api::V1::BaseController
      include Pagy::Backend

      def index
        club_stories = ClubStory.visible
        paginated = paginate(club_stories, serializer: ClubStorySerializer)

        render json: {
          club_stories: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @club_story = ClubStory.friendly.find(params[:id])
        render json: @club_story,
               serializer: ClubStorySerializer,
               include_photos: true
      end
    end
  end
end
