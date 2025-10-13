# frozen_string_literal: true

class RealEstateScraperService
  attr_reader :browser, :tenant, :adapter

  def initialize(tenant:, headless: true)
    @browser = ScraperHelper.setup_browser(headless:)
    @tenant = tenant
    @adapter = ScraperFactory.create(browser: @browser, tenant: @tenant)
  end

  def scrape_all
    log "Starting scrape_all for tenant: #{@tenant.slug}"

    listing_urls = @adapter.get_all_listing_urls
    queue_urls(listing_urls)

    log "Finished scrape_all for tenant: #{@tenant.slug}"
  end

  def scrape_one(url, listing = nil, force: false)
    listing ||= @tenant.listings.find_by(url:)

    log "Starting scrape_one for #{url}"
    @adapter.scrape_listing_details(url, listing, force:)
  end

  def scrape_complex(url, listing_complex = nil)
    unless @adapter.supports_complexes?
      raise "Platform #{@tenant.scraper_platform} doesn't support complexes"
    end

    listing_complex ||= @tenant.listing_complexes.find_by(url:)
    @adapter.scrape_complex(url, listing_complex)
  end

  def rescrape(force: false)
    log "Rescraping all listings for tenant: #{@tenant.slug}"

    @tenant.listings.each do |listing|
      log "Queuing ScrapeUrlJob for #{listing.url}"
      ScrapeUrlJob.perform_later(@tenant.id, listing.url, force)
    end
  end

  def destroy
    @browser.quit
  end

  private

  def queue_urls(listing_urls)
    listing_urls.each_with_index do |url, index|
      log "Queuing ScrapeUrlJob for #{url}"

      wait_time = index * 2.minutes
      ScrapeUrlJob.set(wait: wait_time).perform_later(@tenant.id, url, false)
    end
  end

  def log(message)
    ScrapeListingDetails.log("[RealEstateScraperService] [Tenant: #{@tenant.slug}] #{message}")
  end
end
