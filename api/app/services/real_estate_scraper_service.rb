# frozen_string_literal: true

class RealEstateScraperService
  attr_reader :browser

  def initialize(headless: true)
    @browser = ScraperHelper.setup_browser(headless:)
    @url = Constants::RealEstateScraper::BASE_URL
  end

  def scrape_all
    @browser.goto(@url)
    log @url
    @lister = @url.split('/').last.split('-')[1..-2].join(' ')
    total = total_pages
    total.times do |page|
      one_page(page)
    end
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
    @browser.goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    Listing.all.each do |listing|
      log "Rescrape - Queuing ScrapeUrlJob for #{listing.url}"
      ScrapeUrlJob.perform_later(listing.url, force)
    end
  end

  def scrape_one(url, listing, force: false)
    listing ||= Listing.unscoped.where(url:).order(:updated_at).last

    @browser.goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    ScraperHelper.scrape_one(@browser, url, listing, force:)
  end

  def scrape_complex(url, listing_complex)
    listing_complex ||= ListingComplex.find_by(url:)

    @browser.goto(url)
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

  def log(message)
    ScrapeListingDetails.log("[RealEstateScraperService] #{message}")
  end

  def scrape_total
    @browser.refresh
    return 0 if ScraperHelper.check_if_invalid?(@browser)

    @browser.div(class: 'properties').wait_until(timeout: 10, &:present?)
    matches = @browser.ul(class: 'pagination').wait_until(timeout: 10, &:present?).lis
    matches.count - 2
  end

  def scrape_page(page)
    url = @url + "/pagina-#{page + 1}"
    @browser.goto(url)
    js_doc = @browser.div(class: 'properties').wait_until(timeout: 10, &:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    res = imoveis.css('.property-tile2')
    res.each_with_index do |imovel, index|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.compact.first}"
      log "Queuing ScrapeUrlJob for #{url}"

      wait_time = (index + page) * 2.minutes
      ScrapeUrlJob.set(wait: wait_time).perform_later(url, false)
    end
  end

  def total_pages
    log "Getting total pages for #{@lister}"
    total = scrape_total
    log "Total: #{total} pages"
    total
  end

  def one_page(page)
    log ''
    log '*********'
    log "Started page #{page + 1}"
    scrape_page(page)
    log "Finished page #{page + 1}"
    log '*********'
    log ''
  end

  def scrape_language_listings(listings, locale: :en, language: 'English')
    return unless %i[en pt].include?(locale) && %w[English Português].include?(language)

    @browser.goto(@url)
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
