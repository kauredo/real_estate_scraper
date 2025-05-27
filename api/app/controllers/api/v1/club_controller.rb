# frozen_string_literal: true

module Api
  module V1
    class ClubController < Api::V1::BaseController
      def index
        @recent_stories = ClubStory.visible.limit(2)
        render json: @recent_stories, each_serializer: ClubStorySerializer
      end

      def rules
        render json: { message: 'Club rules', content: 'Club rules content would be here' }
      end

      def join
        unless join_params[:terms_accepted] == 'on'
          render json: { error: I18n.t('club.form.error.terms_required') }, status: :unprocessable_entity
          return
        end

        @club_user = ClubUser.new(join_params)
        if @club_user.save
          NewClubJoinMailer.with(join_params).new_join_request.deliver_later
          render json: { message: I18n.t('club.flash.join.thanks') }, status: :ok
        else
          render json: { errors: @club_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def join_params
        params.require(:club).permit(:name, :email, :phone, :terms_accepted)
      end
    end
  end
end
