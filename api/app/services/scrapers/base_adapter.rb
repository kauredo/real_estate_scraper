# frozen_string_literal: true

module Scrapers
  class BaseAdapter
    attr_reader :browser, :tenant, :base_url

    def initialize(browser:, tenant:)
      @browser = browser
      @tenant = tenant
      @base_url = tenant.scraper_source_url
    end

    # Must be implemented by subclasses
    # Returns an array of listing URLs found on the platform
    def get_all_listing_urls
      raise NotImplementedError, "#{self.class} must implement #get_all_listing_urls"
    end

    # Must be implemented by subclasses
    # Scrapes details for a single listing
    # @param url [String] the URL of the listing to scrape
    # @param listing [Listing] the listing object to update
    # @param force [Boolean] whether to force rescrape even if already scraped
    def scrape_listing_details(url, listing, force: false)
      raise NotImplementedError, "#{self.class} must implement #scrape_listing_details"
    end

    # Must be implemented by subclasses
    # Scrapes photos for a listing
    # @param listing [Listing] the listing object to scrape photos for
    def scrape_listing_photos(listing)
      raise NotImplementedError, "#{self.class} must implement #scrape_listing_photos"
    end

    # Optional: Override if platform supports complexes
    def supports_complexes?
      false
    end

    # Optional: Override if platform supports complexes
    # @param url [String] the URL of the complex to scrape
    # @param listing_complex [ListingComplex] the complex object to update
    def scrape_complex(_url, _listing_complex)
      raise NotImplementedError, "#{self.class} does not support complexes" unless supports_complexes?
    end

    protected

    # Helper methods available to all adapters

    def safe_goto(url)
      ScraperHelper.safe_goto(@browser, url)
    end

    def log(message)
      ScrapeListingDetails.log("[#{self.class.name}] [Tenant: #{@tenant.slug}] #{message}")
    end

    def accept_cookies
      ScraperHelper.accept_cookies(@browser)
    end

    def check_if_invalid?
      ScraperHelper.check_if_invalid?(@browser)
    end
  end
end
