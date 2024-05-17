# frozen_string_literal: true

class ForceRescrapeJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform
    Rails.logger.debug 'ForceRescrapeJob is being performed'
    Rails.application.load_tasks

    Rake::Task['force_rescrape'].reenable
    Rake::Task['force_rescrape'].invoke
    Rake::Task['force_rescrape'].reenable

    Rails.logger.debug 'DONE ForceRescrapeJob'
  end
end
