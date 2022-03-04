class ScrapeJob
  require 'rake'
  include Sidekiq::Job
  sidekiq_options queue: :default, retry: 3
  queue_as :default

  def perform(*args)
    Rails.application.load_tasks # <-- MISSING LINE
    Rake::Task['scrape'].invoke
    puts "ScrapeJob is performed"
  end
end
