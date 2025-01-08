# frozen_string_literal: true

class ForceRescrapeJob
  include Sidekiq::Job
  queue_as :default

  def perform
    ScrapeListingDetails.log 'ForceRescrapeJob is being performed'
    Rails.application.load_tasks
    scraper_service = RealEstateScraperService.new
    scraper_service.rescrape(force: true)
    scraper_service.destroy
    ScrapeListingDetails.log 'DONE ForceRescrapeJob'
  end
end
