# frozen_string_literal: true

require 'task_helper'

module ScraperHelper
  def self.scrape_one(browser, url, listing, force: false)
    I18n.with_locale(:pt) do
      TaskHelper.run_and_retry_on_exception(ScrapeListingDetails.method(:scrape_details), params: [browser, url, force])
    end

    I18n.with_locale(:en) do
      TaskHelper.run_and_retry_on_exception(ScrapeListingDetails.method(:scrape_language_details), params: [browser, listing, 'English']) if listing.reload.deleted_at.nil?
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
