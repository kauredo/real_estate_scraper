# frozen_string_literal: true

class ScrapeAll < ApplicationJob
  def perform
    ScrapeListingDetails.log '[ScrapeAll] is being performed'
    scraper_service = RealEstateScraperService.new
    scraper_service.scrape_all
    scraper_service.destroy
    # RescrapeJob.perform_later
    FixDuplicatesJob.perform_later
    ScrapeListingDetails.log '[ScrapeAll] DONE'
  end
end
