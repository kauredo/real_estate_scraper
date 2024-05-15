# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  puts 'ScrapeJob starting'
  Rake::Task['scrape'].reenable
  Rake::Task['scrape'].invoke
  Rake::Task['scrape'].reenable
  puts 'ScrapeJob is completed for Sofia'

  puts 'ScrapeJob starting, in PT'
  Rake::Task['scrape_pt'].reenable
  Rake::Task['scrape_pt'].invoke
  Rake::Task['scrape_pt'].reenable
  puts 'ScrapeJob is completed, in PT'

  puts 'ScrapeJob starting, in english'
  Rake::Task['scrape_en'].reenable
  Rake::Task['scrape_en'].invoke
  Rake::Task['scrape_en'].reenable
  puts 'ScrapeJob is completed, in english'

  puts 'cleaning up listings'
  Rake::Task['fix_duplicates'].reenable
  Rake::Task['fix_duplicates'].invoke
  Rake::Task['fix_duplicates'].reenable
  puts 'cleaning up listings is done'

  puts 'DONE'
end
