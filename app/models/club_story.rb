# frozen_string_literal: true

class ClubStory < ApplicationRecord
  extend Mobility
  extend FriendlyId

  translates :title, :text, :slug
  friendly_id :title, use: %i[mobility history]

  default_scope { includes(:translations).order(created_at: :desc) }
  scope :visible, -> { where.not(hidden: true) }

  def sample_text
    return if text.nil?

    ActionView::Base.full_sanitizer.sanitize(text.gsub('<p>&nbsp;</p>', '<br>'))
                    .gsub("\r\n\r\n\r\n\r\n\r\n", "\r\n\r\n")
                    .gsub("\r\n\r\n\r\n\r\n", "\r\n\r\n")
                    .gsub("\r\n\r\n\r\n", "\r\n\r\n")
                    .first(100).concat('...')
  end

  private

  def should_generate_new_friendly_id?
    slug.blank? || title_changed?
  end
end

# == Schema Information
#
# Table name: club_stories
#
#  id               :bigint           not null, primary key
#  hidden           :boolean
#  meta_description :text
#  meta_title       :text
#  slug             :string
#  text             :text
#  title            :string
#
# Indexes
#
#  index_club_stories_on_slug  (slug) UNIQUE
#
