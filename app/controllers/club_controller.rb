# frozen_string_literal: true

class ClubController < ApplicationController
  def index
    @recent_stories = ClubStory.visible.limit(3).as_json(methods: %i[sample_text main_photo])
  end

  def social_partners
    @partners = Partner.all.includes(:social_media_posts).as_json(include: { social_media_posts: { methods: :embed_html } })
  end

  def rules; end
end
