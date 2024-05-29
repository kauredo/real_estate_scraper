# frozen_string_literal: true

class ForceRescrapeJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    ScrapeListingDetails.log 'ForceRescrapeJob is being performed'
    Rails.application.load_tasks
    RealEstateScraperService.new.rescrape(force: true)

    ScrapeListingDetails.log 'DONE ForceRescrapeJob'
  end
end
