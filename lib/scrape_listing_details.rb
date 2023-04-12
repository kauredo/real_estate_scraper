# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force_images = false)
    listing = Listing.find_or_initialize_by(url: imovel_url)

    browser.goto(imovel_url)

    TaskHelper.consent_cookies(browser)

    sleep ENV['SLEEP_TIME']&.to_i || 5
    browser.refresh

    listing.title_pt = browser.title
    Rails.logger.debug "Gathering data for listing #{listing.title_pt}"

    # price
    price = browser.span(class: 'fw-listing-price').wait_until(&:present?).text
    listing.price = price

    # status
    status = browser.div(class: 'listing-status').wait_until(&:present?)
    if status.present?
      listing.status = case status.text.strip
                       when 'Novo' then 0
                       when 'Reservado' then 2
                       when 'Vendido' then 3
                       else 1
                       end
    end

    # stats
    count = 0
    begin
      attributes = browser.div(class: 'attributes-data').wait_until(&:present?)
      listing.stats = attributes.divs(class: 'attributes-data-item').map do |row|
        row.text.squish.split(': ')
      end.to_h
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # address
    count = 0
    begin
      listing.address = browser.div(class: 'fw-listing-topbar-address').wait_until(&:present?).text&.squish
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # features
    count = 0
    begin
      listing.features_pt = browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description_pt = browser.div(class: 'listing-details-desc').wait_until(&:present?).text

    # images
    if listing.photos.empty? || force_images
      js_doc = browser.div(class: 'fw-listing-gallery').wait_until(&:present?)
      images = Nokogiri::HTML(js_doc.inner_html)
      res = images.css('img')
      listing.photos = res.map { |img| img.attr('src') }.uniq
    end

    # # geo data
    # listing.location = scrape_location(listing.address)
    listing.title&.gsub! 'm2', 'm²'
    listing.description_pt&.gsub! 'm2', 'm²'
    if listing.stats
      listing.stats['Área Útil']&.gsub! 'm 2', 'm²'
      listing.stats['Área Bruta (CP)']&.gsub! 'm 2', 'm²'
      listing.stats['Área do Terreno']&.gsub! 'm 2', 'm²'
    end

    if listing.save
      Rails.logger.debug "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      Rails.logger.debug message
    end
  end

  def self.scrape_language_details(browser, listing, language)
    browser.goto(listing.url)
    TaskHelper.consent_cookies(browser)

    text = browser.div(class: 'listing-details').wait_until(&:present?).text
    if text.include?(I18n.t('tasks.scrape.unavailable'))
      listing.destroy
      return
    end

    toggle = browser.button(class: 'navbar-toggle').wait_until(&:present?)
    toggle.click
    menu = browser.nav(id: 'menu').wait_until(&:present?)
    en = menu.a(text: language)

    if en.present?
      Rails.logger.debug 'changing language btn present'
      browser.nav(id: 'menu').wait_until(&:present?).a(text: language).wait_until(&:present?).click
    else
      Rails.logger.debug 'changing language btn not present'
      browser.refresh
    end

    listing.title = browser.title
    Rails.logger.debug "Gathering data for listing #{listing.title}"

    # features
    count = 0
    begin
      listing.features = browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description = browser.divs(class: 'listing-details-desc').wait_until(&:present?).map(&:text).reject(&:empty?).first

    # # geo data
    listing.title&.gsub! 'm2', 'm²'
    listing.description&.gsub! 'm2', 'm²'

    if listing.save
      Rails.logger.debug "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      Rails.logger.debug message
    end
  end
end
