# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  Rake::Task['scrape'].invoke
  puts 'ScrapeJob is performed for Sofia'

  Rake::Task['scrape_en'].invoke
  puts 'ScrapeJob is performed for Sofia, in english'

  puts 'DONE'
end
