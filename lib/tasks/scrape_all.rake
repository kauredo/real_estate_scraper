# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  puts 'ScrapeJob starting'
  Rake::Task['scrape'].reenable
  Rake::Task['scrape'].invoke
  Rake::Task['scrape'].reenable
  puts 'ScrapeJob is completed for Sofia'

  puts 'rescrape existing listings'
  Rake::Task['rescrape'].reenable
  Rake::Task['rescrape'].invoke
  Rake::Task['rescrape'].reenable
  puts 'rescrape existing listings is done'

  puts 'cleaning up listings'
  Rake::Task['fix_duplicates'].reenable
  Rake::Task['fix_duplicates'].invoke
  Rake::Task['fix_duplicates'].reenable
  puts 'cleaning up listings is done'

  puts 'DONE'
end
