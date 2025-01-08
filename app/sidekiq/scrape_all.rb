# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Job
  queue_as :default

  def perform
    ScrapeListingDetails.log 'ScrapeAll is being performed'
    scraper_service = RealEstateScraperService.new
    scraper_service.scrape_all
    scraper_service.destroy
    # RescrapeJob.perform_async
    FixDuplicatesJob.perform_async
    ScrapeListingDetails.log 'ScrapeAll DONE'
  end
end
