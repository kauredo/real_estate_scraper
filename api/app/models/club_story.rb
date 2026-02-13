# frozen_string_literal: true

class ClubStory < ApplicationRecord
  include ActsAsTenant
  extend Mobility
  extend FriendlyId

  translates :title, :text, :slug, :small_description
  friendly_id :title, use: %i[mobility history]
  has_many :club_story_photos, dependent: :destroy

  default_scope { order(created_at: :desc) }
  scope :visible, -> { where.not(hidden: true) }

  def sample_text
    return small_description if small_description.present?

    return if text.nil?

    ActionView::Base.full_sanitizer.sanitize(text.gsub('<p>&nbsp;</p>', '<br>'))
                    .gsub("\r\n\r\n\r\n\r\n\r\n", "\r\n\r\n")
                    .gsub("\r\n\r\n\r\n\r\n", "\r\n\r\n")
                    .gsub("\r\n\r\n\r\n", "\r\n\r\n")
                    .first(100).concat('...')
  end

  def main_photo
    if club_story_photos.present? && club_story_photos.select(&:main).present?
      club_story_photos.detect(&:main).image.url
    elsif club_story_photos.present?
      club_story_photos.first.image.url
    elsif text&.include?('src=') && text&.include?('<img')
      Nokogiri::HTML.parse(text).xpath('//img[@src]').first.attributes['src'].value
    else
      'https://sofiagalvaogroup.com/images/banner.webp'
    end
  end

  def sanitized_text
    text.gsub('background: white;', '').gsub('color', '')
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
#  id                :bigint           not null, primary key
#  hidden            :boolean
#  meta_description  :text
#  meta_title        :text
#  slug              :string
#  small_description :text
#  text              :text
#  title             :string
#  video_link        :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  tenant_id         :bigint
#
# Indexes
#
#  index_club_stories_on_slug           (slug) UNIQUE
#  index_club_stories_on_tenant_hidden  (tenant_id,hidden)
#  index_club_stories_on_tenant_id      (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
