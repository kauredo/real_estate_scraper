# frozen_string_literal: true

class ClubController < ApplicationController
  def index
    @recent_stories = ClubStory.visible.limit(2).as_json(methods: %i[sample_text main_photo])
  end

  def rules; end
end
