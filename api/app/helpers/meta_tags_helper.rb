# frozen_string_literal: true

module MetaTagsHelper
  def meta_title
    temp_title = if request.path_info.include?('backoffice')
                   localized_meta['meta_title_backoffice']
                 else
                   content_for?(:meta_title) ? "#{content_for(:meta_title)} | Sofia Galvão Group" : localized_meta['meta_title']
                 end

    if Rails.env.development?
      "DEV | #{temp_title}"
    elsif Rails.env.staging?
      "TESTES | #{temp_title}"
    else
      temp_title
    end
  end

  def meta_description
    content_for?(:meta_description) ? content_for(:meta_description) : localized_meta['meta_description']
  end

  def meta_image
    meta_image = (content_for?(:meta_image) ? content_for(:meta_image) : localized_meta['meta_image'])
    # little twist to make it work equally with an asset or a url
    meta_image.starts_with?('http') ? meta_image : image_url("/images/#{meta_image}")
  end

  private

  def localized_meta
    if I18n.locale == I18n.default_locale
      DEFAULT_META
    else
      DEFAULT_META_EN
    end
  end
end
