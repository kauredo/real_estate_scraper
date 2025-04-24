# frozen_string_literal: true

module Api
  module V1
    class ClubController < Api::V1::BaseController
      def index
        @recent_stories = ClubStory.visible.limit(2)
        render json: @recent_stories.map { |story| ClubStorySerializer.new(story).as_json }
      end

      def rules
        render json: { message: 'Club rules', content: 'Club rules content would be here' }
      end

      def join
        NewClubJoinMailer.with(join_params).new_join_request.deliver_later
        render json: { message: I18n.t('flash.club.join.thanks') }, status: :ok
      end

      private

      def join_params
        params.require(:club_join).permit(:name, :email, :phone)
      end
    end
  end
end
