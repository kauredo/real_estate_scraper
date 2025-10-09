# frozen_string_literal: true

module Api
  module V1
    class ClubStoriesController < Api::V1::BaseController
      include FeatureFlag
      include Previewable

      before_action -> { require_feature!(:club) }

      def index
        club_stories = ClubStory.visible
        paginated = paginate(club_stories, serializer: ClubStorySerializer)

        render json: {
          club_stories: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @club_story = if preview_mode?
                        ClubStory.friendly.find(params[:id])
                      else
                        ClubStory.visible.friendly.find(params[:id])
                      end

        render json: @club_story,
               serializer: ClubStorySerializer,
               include_photos: true
      end

      private

      def controller_content_type
        'club_story'
      end
    end
  end
end
