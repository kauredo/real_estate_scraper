# frozen_string_literal: true

desc 'Run all scrapers'
task scrape_all: :environment do
  Rake::Task['scrape'].invoke
  puts 'ScrapeJob is performed for Sofia'

  Colleague.all.each do |colleague|
    Rake::Task['scrape'].reenable
    Rake::Task['scrape'].invoke(colleague.url)
    puts "Job done for colleague #{colleague.name}"
  end

  puts 'DONE'
end
