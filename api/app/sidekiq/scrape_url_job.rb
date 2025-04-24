# frozen_string_literal: true

class ScrapeUrlJob < ApplicationJob
  retry_on(StandardError, wait: 10.minutes, attempts: 3)

  def perform(url, force = false) # rubocop:disable Style/OptionalBooleanParameter
    ScrapeListingDetails.log("[ScrapeUrlJob] is being performed for #{url}")
    scraper_service = RealEstateScraperService.new
    scraper_service.scrape_one(url, nil, force:)
    scraper_service.destroy
    ScrapeListingDetails.log('[ScrapeUrlJob] DONE')
  end
end
