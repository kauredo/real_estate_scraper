# frozen_string_literal: true

require 'selenium-webdriver'

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, _args|
  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.scrape_all
  scraper_service.destroy
end

desc 'Re-scrape listings off KW website'
task rescrape: :environment do |_t, _args|
  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.rescrape
  scraper_service.destroy
end

desc 'Force re-scrape listings off KW website'
task force_rescrape: :environment do |_t, _args|
  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.rescrape(force: true)
  scraper_service.destroy
end

desc 'Scrape one listing off KW website'
task :scrape_one, %i[url force] => :environment do |_t, arguments|
  url = arguments.url
  force = arguments.force.to_s == 'true'

  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)

  scraper_service.scrape_one(url, nil, force:) if url
  scraper_service.destroy
end
