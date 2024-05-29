# frozen_string_literal: true

class ScrapeUrlJob
  include Sidekiq::Worker
  queue_as :priority

  def perform(url, force)
    Rails.logger.debug "ScrapeJobUrl is being performed for #{url}"
    RealEstateScraperService.new.scrape_one(url, nil, force:)
    Rails.logger.debug 'DONE ScrapeUrlJob'
  end
end
