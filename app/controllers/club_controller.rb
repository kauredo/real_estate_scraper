# frozen_string_literal: true

class ClubController < ApplicationController
  def index
    @recent_stories = ClubStory.visible.limit(3).as_json(methods: %i[sample_text main_photo])
  end

  def social_partners; end

  def home_tailor_partners; end

  def rules; end
end
