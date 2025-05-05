# frozen_string_literal: true

class ClubController < ApplicationController
  def index
    @recent_stories = ClubStory.visible.limit(2).as_json(methods: %i[sample_text main_photo])
  end

  def rules; end

  def join
    unless join_params[:terms_accepted] == 'on'
      respond_to do |format|
        format.html do
          flash[:error] = I18n.t('club.form.error.terms_required')
          return redirect_back(fallback_location: club_path)
        end
        format.json { return render json: { success: false, error: I18n.t('club.form.error.terms_required') } }
      end
    end

    NewClubJoinMailer.with(join_params).new_join_request.deliver_later

    respond_to do |format|
      format.html do
        flash[:notice] = I18n.t('club.flash.join.thanks')
        redirect_back(fallback_location: club_path)
      end
      format.json { render json: { success: true } }
    end
  end

  private

  def join_params
    params.require(:club).permit(:name, :email, :phone, :terms_accepted)
  end
end
