# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  require 'rake'

  def perform
    Rails.logger.debug 'ScrapeAll is being performed'
    Rails.application.load_tasks
    Rake::Task['scrape_all'].invoke

    Rails.logger.debug 'ScrapeAll DONE'
  end
end
