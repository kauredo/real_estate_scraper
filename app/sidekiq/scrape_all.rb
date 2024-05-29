# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  queue_as :default

  def perform
    Rails.logger.debug 'ScrapeAll is being performed'
    RealEstateScraperService.new.scrape_all
    RescrapeJob.perform_async
    FixDuplicatesJob.perform_async
    Rails.logger.debug 'ScrapeAll DONE'
  end
end
