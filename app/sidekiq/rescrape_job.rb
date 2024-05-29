# frozen_string_literal: true

require 'sidekiq-scheduler'

class RescrapeJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    Rails.logger.debug 'RescrapeJob is being performed'
    RealEstateScraperService.new.rescrape

    Rails.logger.debug 'RescrapeJob DONE'
  end
end
