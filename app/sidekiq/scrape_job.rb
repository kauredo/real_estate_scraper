class ScrapeJob
  require 'rake'
  include Sidekiq::Job
  sidekiq_options queue: :default, retry: 3
  queue_as :default

  def perform(*args)
    Rails.application.load_tasks # <-- MISSING LINE
    Rake::Task['scrape'].invoke
    puts "ScrapeJob is performed"

    Colleague.all.each do |colleague|
      Rake::Task["scrape"].invoke(colleague.url)
      puts "Job done for colleague #{colleague.url}"
    end
  end
end
