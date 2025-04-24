# frozen_string_literal: true

class ScrapeComplexJob < ApplicationJob
  retry_on(StandardError, wait: 10.minutes, attempts: 3)

  def perform(url)
    ScrapeListingDetails.log("[ScrapeComplexJob] is being performed for #{url}")
    scraper_service = RealEstateScraperService.new(headless: true)
    scraper_service.scrape_complex(url, nil)
    scraper_service.destroy
    ScrapeListingDetails.log('[ScrapeComplexJob] DONE')
  end
end
