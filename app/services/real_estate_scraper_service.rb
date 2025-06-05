# frozen_string_literal: true

class RealEstateScraperService
  attr_reader :browser

  def initialize(headless: true)
    @browser = ScraperHelper.setup_browser(headless:)
    @url = Constants::RealEstateScraper::BASE_URL
  end

  def scrape_all
    safe_goto(@url)
    log @url
    @lister = @url.split('/').last(2).first.split('-').join(' ')
    ScraperHelper.accept_cookies(@browser)

    log "Getting all listings for #{@lister}"
    scrape_all_listings
    log 'Finished getting all listings'
  end

  def scrape_english_listings
    listings = Listing::Translation.includes([:listing]).where(locale: 'en')
    ids = listings.select do |t|
      Listing::Translation.includes([:listing]).where(locale: 'pt', title: t.title).present?
    end.pluck(:listing_id)

    listings = Listing.all.select do |l|
      l.title_en.blank? || l.description_en.blank? || l.features_en.blank? || ids.include?(l.id)
    end

    log "Found #{listings.size} listings for English"

    scrape_language_listings(listings, locale: :en, language: 'English')
  end

  def scrape_portuguese_listings
    listings = Listing.all.select do |l|
      l.title_pt.blank? || l.description_pt.blank?
    end

    log "Found #{listings.size} listings for Portuguese"

    scrape_language_listings(listings, locale: :pt, language: 'Português')
  end

  def rescrape(force: false)
    safe_goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    Listing.all.each do |listing|
      log "Rescrape - Queuing ScrapeUrlJob for #{listing.url}"
      ScrapeUrlJob.perform_later(listing.url, force)
    end
  end

  def scrape_one(url, listing, force: false)
    listing ||= Listing.unscoped.where(url:).order(:updated_at).last

    safe_goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    ScraperHelper.scrape_one(@browser, url, listing, force:)
  end

  def scrape_complex(url, listing_complex)
    listing_complex ||= ListingComplex.find_by(url:)

    safe_goto(url)
    return if ScraperHelper.check_if_invalid?(@browser)

    name = @browser.h1.wait_until(timeout: 10, &:present?).text
    listing_complex.update(name:)
    scrape_photos_for_complex(listing_complex)

    listings = @browser.table(class: 'properties_table').wait_until(timeout: 10, &:present?).trs
    listings.each_with_index do |listing_element, index|
      relative_url = listing_element.attribute_value('data-href')
      next if relative_url.nil?

      full_url = "https://www.kwportugal.pt#{relative_url}"
      listing = Listing.find_or_initialize_by(url: full_url)
      listing.listing_complex = listing_complex
      listing.title = "Imóvel #{index} - #{name}" if listing.title.blank?
      if listing.persisted?
        listing.save
      else
        listing.save(validate: false)
      end

      log "Queuing ScrapeUrlJob for #{full_url}"
      wait_time = index * 2.minutes
      ScrapeUrlJob.set(wait: wait_time).perform_later(listing.url, false)
      # ScrapeUrlJob.perform_later(listing.url, false)
    end
  end

  def destroy
    @browser.quit
  end

  private

  def safe_goto(url, timeout: 30)
    Timeout.timeout(timeout) do
      @browser.goto(url)
    end
  rescue Timeout::Error => e
    log "Browser navigation timed out for #{url}"
    raise e
  end

  def log(message)
    ScrapeListingDetails.log("[RealEstateScraperService] #{message}")
  end

  def scrape_all_listings
    start_time = Time.current
    @browser.refresh
    return 0 if ScraperHelper.check_if_invalid?(@browser)

    ScraperHelper.accept_cookies(@browser)

    total_listings = @browser.div(class: 'flex items-center flex-col md:flex-row gap-4 md:gap-0 justify-between w-full').wait_until(timeout: 10, &:present?)
    total_text = total_listings.text.match(/(\d+)\s/)[1].to_i

    button = @browser.button(text: 'Ver imóveis').wait_until(timeout: 10, &:present?)
    button_parent = button.parent
    id = button_parent.attribute_value('aria-controls')
    button.click if button.present? && id.present?

    listings_div = @browser.div(id:).div(class: 'px-4 h-full overflow-auto flex flex-col')

    listing_urls = []
    previous_count = 0
    no_change_counter = 0
    max_attempts = 10 # Add a safety limit
    max_total_time = 30.minutes

    loop do
      log 'Getting current listings from the page...'
      # Get current listings
      current_listings = listings_div.as(class: 'w-0 h-0').wait_until(timeout: 10, &:present?).map(&:href).uniq.compact.select { |url| url.start_with?('https://www.kwportugal.pt') && url.downcase.include?('/imovel/') }
      listing_urls = current_listings

      log "Found #{listing_urls.size} listings (target: #{total_text})"

      # Break conditions
      if Time.current - start_time > max_total_time
        log "Scraping timed out after #{max_total_time / 60} minutes"
        break
      end
      break if listing_urls.size >= total_text
      break if no_change_counter >= max_attempts

      # Check if we're making progress
      if listing_urls.size == previous_count
        no_change_counter += 1
        log "No new listings loaded (attempt #{no_change_counter}/#{max_attempts})"
      else
        no_change_counter = 0 # Reset counter if we made progress
      end

      previous_count = listing_urls.size

      # Try to load more content
      load_more_content(listings_div)
    end

    log "Final count: #{listing_urls.size} listings"
    queue_urls(listing_urls)
  end

  def load_more_content(listings_div)
    log 'Loading more content...'
    # Scroll to bottom
    @browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', listings_div)
    # sleep 2

    # Try clicking "Ver mais" if present
    if listings_div.button(text: 'Ver mais').present?
      begin
        listings_div.button(text: 'Ver mais').click
        log "Clicked 'Ver mais' button"
        # sleep 3
      rescue StandardError => e
        log "Failed to click 'Ver mais': #{e.message}"
      end
    else
      # If no button, try scrolling again
      log "'Ver mais' button not found, scrolling to load more listings"
      @browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', listings_div)
      # sleep 2
    end
  end

  def queue_urls(listing_urls)
    listing_urls.each_with_index do |url, index|
      log "Queuing ScrapeUrlJob for #{url}"

      wait_time = index * 2.minutes
      ScrapeUrlJob.set(wait: wait_time).perform_later(url, false)
    end
  end

  def scrape_language_listings(listings, locale: :en, language: 'English')
    return unless %i[en pt].include?(locale) && %w[English Português].include?(language)

    safe_goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    I18n.with_locale(locale) do
      listings.each do |listing|
        log "Started listing #{listing.id}"
        ScrapeListingDetails.scrape_language_details(@browser, listing, language)
      end
    end
  end

  def scrape_photos_for_complex(listing_complex)
    photo_elements = @browser.div(class: 'gallery').imgs

    photo_elements.each_with_index do |img_element, index|
      photo_url = img_element.attribute_value('src')
      next if photo_url.blank?

      # Use find_or_initialize_by if you want to avoid duplicates
      photo = listing_complex.photos.find_or_initialize_by(original_url: photo_url)
      photo.remote_image_url = photo_url # This is how you set the image URL for CarrierWave
      photo.main = (index.zero?)

      # You can also set an order field if your Photo model uses it.
      photo.order = index + 1

      if photo.new_record? || photo.changed?
        if photo.save
          log "Saved photo ##{index + 1} for listing_complex #{listing_complex.name}"
        else
          log "Failed to save photo for #{photo_url}: #{photo.errors.full_messages.join(', ')}"
        end
      else
        log "Photo for #{photo_url} already exists, skipping."
      end
    end
  end
end
