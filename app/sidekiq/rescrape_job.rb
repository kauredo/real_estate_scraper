# frozen_string_literal: true

require 'sidekiq-scheduler'

class RescrapeJob
  include Sidekiq::Job
  queue_as :default

  def perform
    ScrapeListingDetails.log 'RescrapeJob is being performed'
    scraper_service = RealEstateScraperService.new
    scraper_service.rescrape
    scraper_service.destroy
    ScrapeListingDetails.log 'RescrapeJob DONE'
  end
end
