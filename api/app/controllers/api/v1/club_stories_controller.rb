# frozen_string_literal: true

module Api
  module V1
    class ClubStoriesController < Api::V1::BaseController
      include FeatureFlag
      include Previewable
      include Cacheable

      before_action -> { require_feature!(:club) }

      def index
        # Set HTTP cache headers (5 minutes)
        set_cache_headers(max_age: 5.minutes)

        club_stories = ClubStory.visible
        paginated = paginate(club_stories, serializer: ClubStorySerializer)

        render json: {
          club_stories: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @club_story = if preview_mode?
                        ClubStory.includes(:club_story_photos).friendly.find(params[:id])
                      else
                        ClubStory.visible.includes(:club_story_photos).friendly.find(params[:id])
                      end

        # Set ETag and Last-Modified headers for conditional GET (skip in preview mode)
        unless preview_mode?
          fresh_when(
            etag: [@club_story, Current.tenant],
            last_modified: @club_story.updated_at,
            public: true
          )
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
