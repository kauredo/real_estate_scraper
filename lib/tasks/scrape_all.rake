# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  puts 'ScrapeAll starting'
  Rake::Task['scrape'].reenable
  Rake::Task['scrape'].invoke
  Rake::Task['scrape'].reenable

  puts 'queue rescrape existing listings'
  RescrapeJob.perform_later

  puts 'queue cleaning up listings'
  FixDuplicatesJob.perform_later

  puts 'ScrapeAll DONE'
end
