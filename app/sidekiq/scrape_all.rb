require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  require 'rake'

  def perform
    puts 'ScrapeAll is being performed'
    Rails.application.load_tasks
    Rake::Task['scrape_all'].invoke

    puts 'ScrapeAll DONE'
  end
end
