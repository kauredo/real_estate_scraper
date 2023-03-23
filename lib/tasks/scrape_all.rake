# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  puts 'ScrapeJob starting'
  Rake::Task['scrape'].invoke
  puts 'ScrapeJob is completed for Sofia'

  puts 'ScrapeJob starting, in PT'
  Rake::Task['scrape_pt'].invoke
  puts 'ScrapeJob is completed, in PT'

  puts 'ScrapeJob starting, in english'
  Rake::Task['scrape_en'].invoke
  puts 'ScrapeJob is completed, in english'

  puts 'DONE'
end
