# frozen_string_literal: true

class ClubController < ApplicationController
  def index
    @recent_stories = ClubStory.visible.limit(2).as_json(methods: %i[sample_text main_photo])
  end

  def rules; end

  def join
    unless params[:club_join][:terms_accepted] == 'true'
      flash[:error] = I18n.t('flash.club.join.terms_required')
      return redirect_back(fallback_location: club_path)
    end

    NewClubJoinMailer.with(join_params).new_join_request.deliver_later

    flash[:notice] = I18n.t('flash.club.join.thanks')
    redirect_back(fallback_location: club_path)
  end

  private

  def join_params
    params.require(:club_join).permit(:name, :email, :phone, :terms_accepted)
  end
end
