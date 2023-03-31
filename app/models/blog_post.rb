class BlogPost < ApplicationRecord
  extend Mobility
  translates :title, :text
  has_many :blog_photos, dependent: :destroy

  def sample_text
    return if text.nil?

    ActionView::Base.full_sanitizer.sanitize(text.gsub('<p>&nbsp;</p>', '<br>')).first(100).concat('...')
  end

  def main_photo
    if blog_photos.present? && blog_photos.select(&:main).present?
      blog_photos.detect(&:main).image.url
    elsif blog_photos.present?
      blog_photos.first.image.url
    else
      'https://sofiagalvaogroup.com/images/banner.webp'
    end
  end
end
