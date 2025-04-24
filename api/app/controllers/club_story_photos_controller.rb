# frozen_string_literal: true

class ClubStoryPhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    return if params[:file].blank?
    return unless params[:file].instance_of?(ActionDispatch::Http::UploadedFile)

    @image = ClubStoryPhoto.new(image: params[:file], club_story_id: Rails.cache.write('club-story-id'))

    respond_to do |format|
      if %r{image/}.match?(params[:file].content_type) && @image.save
        format.json { render json: { "location": @image.image.url }.to_json, status: :ok }
      else
        format.json { render json: @image.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    photo = ClubStoryPhoto.find(params[:id])
    club_story_id = photo.club_story_id
    photo.destroy!

    redirect_to edit_backoffice_club_story_path(club_story_id)
  end
end
