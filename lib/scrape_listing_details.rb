# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force = false)
    browser.goto(imovel_url)

    unless @browser.text.downcase.include? 'imóveis'
      log 'KW website down'
      return
    end

    unless browser.text.include? 'Sofia Galvão'
      log 'listing unavailable on KW website, it will be destroyed'
      listing = Listing.find_by(url: imovel_url)
      listing&.destroy
      return
    end

    toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)
    retry_count = 0
    until toggle&.text == 'Português' || retry_count >= 2
      toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)

      toggle.click
      language_list = browser.ul(class: 'dropdown-menu show').wait_until(timeout: 10, &:present?)
      language_list.a(text: 'Português').click

      # go back on the page to refresh the page with the new language
      browser.back
      browser.refresh
      retry_count += 1
    end
    sleep 1

    title = browser.title.gsub! 'm2', 'm²'
    url = browser.url
    log "Gathering data for listing #{title}"

    old_url_exists = Listing.exists?(url: imovel_url)
    new_url_exists = Listing.exists?(url:)
    name_exists = Listing.includes(:translations).where(translations: { locale: 'pt', title: }).exists?

    listing = if old_url_exists && name_exists
                Listing.includes(:translations).find_by(url: imovel_url, translations: { locale: 'pt', title: })
              elsif new_url_exists && name_exists
                Listing.includes(:translations).find_by(url:, translations: { locale: 'pt', title: })
              elsif old_url_exists
                Listing.find_by(url: imovel_url)
              elsif new_url_exists
                Listing.find_by(url:)
              else
                Listing.find_or_initialize_by(title:)
              end

    # TaskHelper.consent_cookies(browser)
    listing = Listing.find_or_initialize_by(title:) if listing.nil?

    unless @browser.text.downcase.include? 'imóveis'
      log 'KW website down'
      return
    end

    unless browser.text.include? 'Sofia Galvão'
      log 'listing unavailable on KW website, it will be destroyed'
      listing.destroy
      return
    end

    if !force && (listing.persisted? && Listing.includes(:translations).where(url:, translations: { locale: 'pt', title: }))
      log "Listing #{listing.title} already exists, not updating"
      return
    end

    browser.refresh

    listing.url = url
    listing.title_pt = title

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

    unless browser.text.include? 'Sofia Galvão'
      log 'listing unavailable on KW website'
      return
    end

    # TaskHelper.consent_cookies(browser)
    toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)

    until toggle.text == language
      toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)

      if toggle.text != language
        toggle.click

        language_list = browser.ul(class: 'dropdown-menu show').wait_until(timeout: 10, &:present?)
        lang_button = language_list.a(text: language)

        if lang_button.present?
          log 'changing language btn present'
          lang_button.click
          browser.back
        else
          log 'changing language btn not present'
        end

        browser.refresh
      else
        log 'language already set'
      end
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
