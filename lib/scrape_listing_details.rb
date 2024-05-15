# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force = false)
    browser.goto(imovel_url)
    sleep 1

    title = browser.title
    url = browser.url

    old_url_exists = Listing.exists?(url: imovel_url)
    new_url_exists = Listing.exists?(url:)
    name_exists = Listing.exists?(title:)

    listing = if old_url_exists && name_exists
                Listing.find_by(url: imovel_url, title:)
              elsif new_url_exists && name_exists
                Listing.find_by(url:, title:)
              elsif old_url_exists
                Listing.find_by(url: imovel_url)
              elsif new_url_exists
                Listing.find_by(url:)
              else
                Listing.find_or_initialize_by(title:)
              end

    # TaskHelper.consent_cookies(browser)

    if !force && (!listing.persisted? && Listing.unscoped.exists?(url:, title:))
      log "Listing #{listing.title} already exists, not updating"
      return
    end

    browser.refresh

    listing.url = url
    listing.title_pt = title
    log "Gathering data for listing #{listing.title_pt}"

    # unless url has div with id 'property', destroy listing and return
    begin
      browser.div(id: 'property').wait_until(timeout: 10, &:present?)
    rescue StandardError => _e
      log 'listing unavailable'
      listing.destroy
      return
    end

    # price
    count = 0
    begin
      price = browser.div(class: 'price').wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => _e
      count += 1
      retry if count < 3

      price = nil
    end
    listing.price = price

    # # status
    # count = 0
    # begin
    #   status = browser.div(class: 'listing-status').wait_until(timeout: 10, &:present?)
    # rescue StandardError => e
    #   count += 1
    #   retry if count < 3

    #   status = nil
    # end

    # if status.present?
    #   listing.status = case status.text.strip
    #                    when 'Novo' then 0
    #                    when 'Reservado' then 2
    #                    when 'Vendido' then 3
    #                    else 1
    #                    end
    # end

    listing.status = 1

    # stats
    count = 0
    begin
      attributes = browser.div(class: 'infopoints').wait_until(timeout: 10, &:present?)
    rescue StandardError => e
      count += 1
      retry if count < 3

      attributes = nil
    end

    if attributes.present?
      listing.stats = attributes.divs(class: 'point').map do |row|
        row&.text&.squish&.split(': ')
      end.to_h
    end

    # address
    count = 0
    begin
      address = browser.div(class: 'location').wait_until(timeout: 10, &:present?)&.text&.squish
    rescue StandardError => e
      count += 1
      retry if count < 3

      address = nil
    end
    listing.address = address

    # features
    count = 0
    begin
      features = browser.div(class: 'characteristics').wait_until(timeout: 10, &:present?)&.lis&.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3

      features = nil
    end
    listing.features_pt = features

    # description
    count = 0
    begin
      description = browser.div(class: 'description').wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => e
      count += 1
      retry if count < 3

      description = nil
    end

    listing.description_pt = description

    # images
    if listing.photos.empty? || force
      images = browser.div(class: 'content-photos').wait_until(timeout: 10, &:present?).as(class: 'lightbox')
      listing.photos = images.map(&:href)
    end

    # # geo data
    # listing.location = scrape_location(listing.address)
    listing.title&.gsub! 'm2', 'm²'
    listing.description_pt&.gsub! 'm2', 'm²'
    if listing.stats
      listing.stats['Área Útil']&.gsub! 'm2', 'm²'
      listing.stats['Área Bruta (CP)']&.gsub! 'm2', 'm²'
      listing.stats['Área do Terreno']&.gsub! 'm2', 'm²'
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
    # TaskHelper.consent_cookies(browser)

    toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)
    toggle.click

    language_list = browser.ul(class: 'dropdown-menu show').wait_until(timeout: 10, &:present?)
    en = language_list.a(text: language)

    if en.present?
      log 'changing language btn present'
      en.click
    else
      log 'changing language btn not present'
      browser.refresh
    end

    # unless url has div with id 'property', return
    begin
      browser.div(id: 'property').wait_until(timeout: 10, &:present?)
    rescue StandardError => _e
      log 'listing unavailable'
      # listing.destroy
      return
    end

    listing.title = browser.title
    log "Gathering data for listing #{listing.title}"

    # features
    count = 0
    begin
      listing.features = browser.div(class: 'characteristics').wait_until(timeout: 10, &:present?)&.lis&.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description = browser.div(class: 'description').wait_until(timeout: 10, &:present?)&.text

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
