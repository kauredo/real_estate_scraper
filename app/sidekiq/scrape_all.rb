# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform
    Rails.logger.debug 'ScrapeAll is being performed'
    Rails.application.load_tasks

    Rake::Task['scrape_all'].reenable
    Rake::Task['scrape_all'].invoke
    Rake::Task['scrape_all'].reenable

    Rails.logger.debug 'ScrapeAll DONE'
  end
end
