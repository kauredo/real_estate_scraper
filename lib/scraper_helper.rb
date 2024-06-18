# frozen_string_literal: true

require 'task_helper'

module ScraperHelper
  def self.scrape_one(browser, url, listing, force: false)
    max_retries = 2
    retry_count = 0

    begin
      updated_listing = nil unless updated_listing.is_a?(Listing)

      I18n.with_locale(:pt) do
        updated_listing = ScrapeListingDetails.scrape_details(browser, url, force) unless updated_listing.is_a?(Listing)
      end

      I18n.with_locale(:en) do
        if updated_listing.is_a?(Listing) && updated_listing.reload.deleted_at.nil?
          ScrapeListingDetails.scrape_language_details(browser, updated_listing, 'English')
        elsif listing && listing.reload.deleted_at.nil?
          ScrapeListingDetails.scrape_language_details(browser, listing, 'English')
        end
      end
    rescue Selenium::WebDriver::Error::UnknownError, Selenium::WebDriver::Error::TimeoutError, Selenium::WebDriver::Error::NoSuchElementError => e
      ScrapeListingDetails.log "An error occurred during ScrapeHelper.scrape_one: #{e.message}"
      retry_count += 1
      browser.refresh

      # Check if we should retry
      if retry_count < max_retries
        retry
      else
        ScrapeListingDetails.log "Failed to scrape after #{max_retries} attempts."
        raise e
      end
    end
  end

  def self.check_if_invalid?(browser)
    sleep 5 # wait for the page to load fully
    valid = browser.text.downcase.include? 'imóveis'
    if valid
      false
    else
      ScrapeListingDetails.log 'KW website down'
      true
    end
  end
end
