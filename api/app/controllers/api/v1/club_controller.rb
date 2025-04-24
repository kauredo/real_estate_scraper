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
        render json: { success: false, error: I18n.t('club.form.error.terms_required') } and return unless join_params[:terms_accepted] == 'on'

        @club_user = ClubUser.new(join_params)

        if @club_user.save
          NewClubJoinMailer.with(join_params).new_join_request.deliver_later
          render json: { message: I18n.t('flash.club.join.thanks') }, status: :ok
        else
          render json: { success: false, error: @club_user.errors.full_messages.join('. ') }
        end
      end

      private

      def join_params
        params.require(:club).permit(:name, :email, :phone, :terms_accepted)
      end
    end
  end
end
