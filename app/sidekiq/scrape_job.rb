class ScrapeJob < ActiveJob::Base
  require 'rake'
  queue_as :default

  def perform(*_args)
    Rails.application.load_tasks # <-- MISSING LINE
    Rake::Task['scrape'].invoke
    puts 'ScrapeJob is performed'

    Colleague.all.each do |colleague|
      Rake::Task['scrape'].invoke(colleague.url)
      puts "Job done for colleague #{colleague.url}"
    end

    puts 'DONE'
  end
end
