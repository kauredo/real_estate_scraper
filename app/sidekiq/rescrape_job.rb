# frozen_string_literal: true

require 'sidekiq-scheduler'

class RescrapeJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform
    Rails.logger.debug 'RescrapeJob is being performed'
    Rails.application.load_tasks

    Rake::Task['rescrape'].reenable
    Rake::Task['rescrape'].invoke
    Rake::Task['rescrape'].reenable

    Rails.logger.debug 'RescrapeJob DONE'
  end
end
