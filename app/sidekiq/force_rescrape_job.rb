# frozen_string_literal: true

class ForceRescrapeJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    Rails.logger.debug 'ForceRescrapeJob is being performed'
    Rails.application.load_tasks
    RealEstateScraperService.new.rescrape(force: true)

    Rails.logger.debug 'DONE ForceRescrapeJob'
  end
end
