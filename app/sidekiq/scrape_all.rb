# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  queue_as :default

  def perform
    ScrapeListingDetails.log 'ScrapeAll is being performed'
    RealEstateScraperService.new.scrape_all
    RescrapeJob.perform_async
    FixDuplicatesJob.perform_async
    ScrapeListingDetails.log 'ScrapeAll DONE'
  end
end
