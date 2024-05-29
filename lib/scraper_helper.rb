# frozen_string_literal: true

require 'task_helper'

module ScraperHelper
  def self.scrape_one(browser, url, listing, force: false)
    updated_listing = nil
    I18n.with_locale(:pt) do
      updated_listing = ScrapeListingDetails.scrape_details(browser, url, force)
    end

    I18n.with_locale(:en) do
      if listing && listing.reload.deleted_at.nil?
        ScrapeListingDetails.scrape_language_details(browser, listing, 'English')
      elsif updated_listing.is_a?(Listing) && updated_listing.deleted_at.nil?
        ScrapeListingDetails.scrape_language_details(browser, updated_listing, 'English')
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
