# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force_images = false)
    listing = Listing.find_or_initialize_by(url: imovel_url)

    browser.goto(imovel_url)

    TaskHelper.consent_cookies(browser)

    sleep ENV['SLEEP_TIME']&.to_i || 5
    browser.refresh
    sleep ENV['SLEEP_TIME']&.to_i || 5

    listing.title_pt = browser.title
    log "Gathering data for listing #{listing.title_pt}"

    text = I18n.t('tasks.scrape.awaiting')

    until text != I18n.t('tasks.scrape.awaiting') && !text.start_with?(I18n.t('tasks.scrape.see_other'))
      text = browser.div(class: 'listing-details').wait_until(timeout: 10, &:present?)&.text
      sleep 1
    end

    log '!!!!!!!!!!!!!!!!!!!!'
    log "text: #{text}"
    if text.include?(I18n.t('tasks.scrape.unavailable'))
      log 'listing unavailable'
      listing.destroy
      return
    end

    # price
    count = 0
    begin
      price = browser.span(class: 'fw-listing-price').wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => e
      count += 1
      retry if count < 3

      price = nil
    end
    listing.price = price

    # status
    count = 0
    begin
      status = browser.div(class: 'listing-status').wait_until(timeout: 10, &:present?)
    rescue StandardError => e
      count += 1
      retry if count < 3

      status = nil
    end

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
      attributes = browser.div(class: 'attributes-data').wait_until(timeout: 10, &:present?)
    rescue StandardError => e
      count += 1
      retry if count < 3

      attributes = nil
    end

    if attributes.present?
      listing.stats = attributes.divs(class: 'attributes-data-item').map do |row|
        row&.text&.squish&.split(': ')
      end.to_h
    end

    # address
    count = 0
    begin
      address = browser.div(class: 'fw-mobile-address').wait_until(timeout: 10, &:present?).p(class: 'ng-binding').wait_until(timeout: 10, &:present?)&.text&.squish
    rescue StandardError => e
      count += 1
      retry if count < 3

      address = nil
    end
    listing.address = address

    # features
    count = 0
    begin
      features = browser.div(class: 'features-container').wait_until(timeout: 10, &:present?)&.child(class: 'row')&.children&.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3

      features = nil
    end
    listing.features_pt = features

    # description
    count = 0
    begin
      description = browser.div(class: 'listing-details-desc').wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => e
      count += 1
      retry if count < 3

      description = nil
    end

    listing.description_pt = description

    # images
    if listing.photos.empty? || force_images
      images = browser.divs(class: 'fw-listing-gallery-image').wait_until(timeout: 10, &:present?)
      listing.photos = images.map { |div| div.img.src }.uniq
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

    ActiveRecord::Base.connection_pool.release_connection
    ActiveRecord::Base.connection_pool.with_connection do
      if listing.save
        log "Finished listing #{listing.title}"
      else
        message = "ERROR: Listing at #{listing.url} has errors"
        log message
      end
    end
  end

  def self.scrape_language_details(browser, listing, language)
    browser.goto(listing.url)
    TaskHelper.consent_cookies(browser)

    toggle = browser.button(class: 'navbar-toggle').wait_until(timeout: 10, &:present?)
    toggle.click
    menu = browser.nav(id: 'menu').wait_until(timeout: 10, &:present?)
    en = menu.a(text: language)

    if en.present?
      log 'changing language btn present'
      sleep ENV['SLEEP_TIME']&.to_i || 5
      browser.nav(id: 'menu').wait_until(timeout: 10, &:present?)&.a(text: language)&.wait_until(timeout: 10, &:present?)&.click
    else
      log 'changing language btn not present'
      browser.refresh
    end

    text = I18n.t('tasks.scrape.awaiting')
    sleep ENV['SLEEP_TIME']&.to_i || 5

    until text != I18n.t('tasks.scrape.awaiting') && !text.start_with?(I18n.t('tasks.scrape.see_other'))
      text = browser.div(class: 'listing-details').wait_until(timeout: 10, &:present?)&.text
      sleep 1
    end

    log '!!!!!!!!!!!!!!!!!!!!'
    log "text: #{text}"
    if text.include?(I18n.t('tasks.scrape.unavailable'))
      listing.destroy
      return
    end

    listing.title = browser.title
    log "Gathering data for listing #{listing.title}"

    # features
    count = 0
    begin
      listing.features = browser.div(class: 'features-container').wait_until(timeout: 10, &:present?)&.child(class: 'row')&.children&.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description = browser.divs(class: 'listing-details-desc').wait_until(timeout: 10, &:present?)&.map(&:text)&.reject(&:empty?)&.first

    # # geo data
    listing.title&.gsub! 'm2', 'm²'
    listing.description&.gsub! 'm2', 'm²'

    ActiveRecord::Base.connection_pool.release_connection
    ActiveRecord::Base.connection_pool.with_connection do
      if listing.save
        log "Finished listing #{listing.title}"
      else
        message = "ERROR: Listing at #{listing.url} has errors"
        @errors << [listing, message]
        log message
      end
    end
  end

  def self.log(message)
    puts message
    Rails.logger.debug message
  end
end
