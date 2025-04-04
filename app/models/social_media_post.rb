# frozen_string_literal: true

class SocialMediaPost < ApplicationRecord
  belongs_to :partner
  validates :url, presence: true

  after_create :fetch_html

  def fetch_html
    case platform
    when :instagram
      fetch_html_for_instagram
    when :tiktok
      fetch_html_for_tiktok
    end
  end

  def platform
    if url.include?('instagram.com')
      :instagram
    elsif url.include?('tiktok.com')
      :tiktok
    else
      :unknown
    end
  end

  private

  def fetch_html_for_tiktok
    embed_url = URI("https://www.tiktok.com/oembed?url=#{url}")
    response = Net::HTTP.get_response(embed_url)

    raise "Failed to fetch TikTok post: #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    response_json = JSON.parse(response.body)
    html = response_json['html']

    # Remove everything from <section> to </blockquote>, and remove the script tag
    cleaned_html = html.gsub(%r{<section>.*?</blockquote>}m, '</blockquote>').gsub(%r{<script.*?</script>}m, '').gsub(%r{</blockquote>}m, '<section></section></blockquote>')

    update(embed_html: cleaned_html)
  rescue StandardError => e
    Rails.logger.error("Error fetching TikTok post: #{e.message}")
    nil
  end

  def fetch_html_for_instagram
    embed_html = <<-HTML
        <blockquote#{' '}
          class="instagram-media"#{' '}
          data-instgrm-permalink="#{url}?utm_source=ig_embed&amp;utm_campaign=loading"#{' '}
          data-instgrm-version="14">
        </blockquote>
    HTML

    update(embed_html:)
  end
end

# == Schema Information
#
# Table name: social_media_posts
#
#  id         :bigint           not null, primary key
#  embed_html :text
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  partner_id :bigint
#
# Indexes
#
#  index_social_media_posts_on_partner_id  (partner_id)
#
# Foreign Keys
#
#  fk_rails_...  (partner_id => partners.id)
#
