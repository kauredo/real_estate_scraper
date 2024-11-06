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
    listings = Listing::Translation.where(locale: 'en')
    ids = listings.select do |t|
      Listing::Translation.where(locale: 'pt', title: t.title).present?
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
      ScrapeUrlJob.perform_async(listing.url, force)
    end
  end

  def scrape_one(url, listing, force: false)
    listing = Listing.find_by(url:) if listing.nil?

    @browser.goto(@url)
    return if ScraperHelper.check_if_invalid?(@browser)

    ScraperHelper.scrape_one(@browser, url, listing, force:)
  end

  def destroy
    @browser.quit
  end

  private

  def log(message)
    ScrapeListingDetails.log(message)
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
    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.compact.first}"
      log "Queuing ScrapeUrlJob for #{url}"
      ScrapeUrlJob.perform_async(url, false)
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
end
