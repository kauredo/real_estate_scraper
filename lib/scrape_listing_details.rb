# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force = false)
    website_avaliable = navigate_and_check_website(browser, imovel_url)
    return unless website_avaliable

    toggle_language(browser, 'Português')
    gather_listing_data(browser, imovel_url, force)
  end

  def self.scrape_language_details(browser, listing, language)
    website_avaliable = navigate_and_check_website(browser, listing.url)
    return unless website_avaliable

    toggle_language(browser, language)
    update_translatable_listing_fields(browser, listing)
  end

  def self.navigate_and_check_website(browser, url, delete: false)
    browser.goto(url)
    check_website_availability(browser, url, delete)
  end

  def self.check_website_availability(browser, url, delete)
    sleep ENV['SLEEP_TIME']&.to_i || 5 # wait for the page to load fully
    unless browser.text.downcase.include? 'imóveis'
      log 'KW website down'
      return false
    end

    return true if browser.text.include? 'Contacte-me'

    log 'listing unavailable on KW website, it will be destroyed'
    destroy_listing_if_exists(url) if delete
    false
  end

  def self.toggle_language(browser, target_language)
    toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)
    retry_count = 0

    until toggle&.text == target_language || retry_count >= 2
      toggle = browser.a(id: 'navbarDropdownLanguage').wait_until(timeout: 10, &:present?)

      toggle.click
      language_list = browser.ul(class: 'dropdown-menu show').wait_until(timeout: 10, &:present?)
      language_list.a(text: target_language).click

      # go back on the page to refresh the page with the new language
      browser.refresh
      sleep ENV['SLEEP_TIME']&.to_i || 5
      retry_count += 1
    end
  end

  def self.gather_listing_data(browser, imovel_url, force)
    title = browser.title.gsub('m2', 'm²')
    url = browser.url
    log "Gathering data for listing \"#{title}\""

    listing = find_or_initialize_listing(imovel_url, title, url)

    if !force && listing.persisted? && listing.translations.any? { |t| t.locale == 'pt' && t.title == title }
      log "Listing \"#{listing.title}\" already exists"
      return listing
    end

    update_listing_fields(browser, listing, force)
  end

  def self.update_listing_fields(browser, listing, force)
    listing.title = browser.title.gsub('m2', 'm²')
    listing.url = browser.url
    listing.status = 1

    listing.populate_type_and_objective

    price = extract_price(browser)
    if price
      price = price.gsub(/\D/, '')
      listing.price = price
    end

    stats = extract_stats(browser)
    listing.stats = stats if stats

    address = extract_address(browser)
    listing.address = address if address

    features = extract_features(browser)
    listing.features = features if features

    description = extract_description(browser)
    listing.description = description if description

    if listing.photos.blank? || force
      photos = extract_images(browser)
      listing.photos = photos if photos
    end

    save_listing(listing)
  end

  def self.update_translatable_listing_fields(browser, listing)
    log "Gathering translated data for listing \"#{listing.title}\""

    listing.title = browser.title.gsub('m2', 'm²')

    features = extract_features(browser)
    listing.features = features if features

    description = extract_description(browser)
    listing.description = description.gsub!('m2', 'm²') if description

    save_listing(listing)
  end

  def self.extract_price(browser)
    count = 0
    begin
      browser.div(class: 'price').wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_stats(browser)
    count = 0
    begin
      browser.div(class: 'infopoints').wait_until(timeout: 10, &:present?)&.divs(class: 'point')&.map { |row| row&.text&.squish&.split(': ') }.to_h
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_address(browser)
    count = 0
    begin
      browser.div(class: 'location').wait_until(timeout: 10, &:present?)&.text&.squish
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_features(browser)
    count = 0
    begin
      browser.div(class: 'characteristics').wait_until(timeout: 10, &:present?)&.lis&.map(&:text)
    rescue StandardError => _e
      count += 1
      retry if count < 3

      []
    end
  end

  def self.extract_description(browser)
    count = 0
    begin
      browser.div(class: 'description').wait_until(timeout: 10, &:present?)&.div(class: 'texts')&.wait_until(timeout: 10, &:present?)&.text
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_images(browser)
    count = 0
    begin
      browser.div(class: 'content-photos').wait_until(timeout: 10, &:present?)&.as&.map(&:href)
    rescue StandardError => _e
      count += 1
      retry if count < 3

      []
    end
  end

  def self.save_listing(listing)
    # ActiveRecord::Base.connection_pool.release_connection
    # ActiveRecord::Base.connection_pool.with_connection do
    if listing.save(validate: false)
      log "Finished listing \"#{listing.title}\""
    else
      log "ERROR: Listing at \"#{listing.url}\" has errors"
    end
    # end
    listing
  end

  def self.find_or_initialize_listing(imovel_url, title, url)
    # Fetch listings that match either old URL or new URL
    listings = Listing.unscoped
                      .includes(:translations)
                      .where('url = :imovel_url OR url = :url', imovel_url:, url:)

    # Filter by title if it exists
    matching_listing = listings.find do |listing|
      listing.translations.any? { |t| t.locale == 'pt' && t.title == title }
    end

    # Return the first match or find/initialize by title as fallback
    matching_listing || Listing.find_or_initialize_by(title:)
  end

  def self.destroy_listing_if_exists(url)
    listing = Listing.find_by(url:)
    return unless listing

    log 'listing unavailable on KW website, it will be destroyed'
    listing&.destroy
  end

  def self.log(message)
    puts message # rubocop:disable Rails/Output
    Rails.logger.debug message
  end
end
