# frozen_string_literal: true

class SocialMediaPost < ApplicationRecord
  belongs_to :partner
  validates :url, presence: true

  def platform
    if url.include?('instagram.com')
      :instagram
    elsif url.include?('tiktok.com')
      :tiktok
    else
      :unknown
    end
  end

  def embed_html
    case platform
    when :instagram
      <<-HTML
        <blockquote#{' '}
          class="instagram-media"#{' '}
          data-instgrm-permalink="#{url}?utm_source=ig_embed&amp;utm_campaign=loading"#{' '}
          data-instgrm-version="14">
        </blockquote>
      HTML
    when :tiktok
      video_id = url.match(%r{video/(\d+)}).try(:[], 1)
      <<-HTML
        <blockquote#{' '}
          class="tiktok-embed"#{' '}
          cite="https://www.tiktok.com/@lucaswithstrangers/video/7303278192016510241"#{' '}
          data-video-id="7303278192016510241"#{' '}
          data-embed-from="embed_page">
            <section></section>
            <script async src="https://www.tiktok.com/embed.js"></script>
        </blockquote>
      HTML
    end
  end
end

# == Schema Information
#
# Table name: social_media_posts
#
#  id         :bigint           not null, primary key
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
