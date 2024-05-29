# frozen_string_literal: true

require 'sidekiq-scheduler'

class RescrapeJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    ScrapeListingDetails.log 'RescrapeJob is being performed'
    RealEstateScraperService.new.rescrape

    ScrapeListingDetails.log 'RescrapeJob DONE'
  end
end
