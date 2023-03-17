require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  require 'rake'

  def perform
    Rails.logger.debug 'ScrapeJobUrl is being performed'
    Rails.application.load_tasks
    Rake::Task['scrape'].invoke

    Rails.logger.debug 'DONE'
  end
end
