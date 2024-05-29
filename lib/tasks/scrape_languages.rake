# frozen_string_literal: true

require 'selenium-webdriver'

desc 'Scrape english listings off KW website'
task scrape_en: :environment do |_t, _args|
  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.scrape_english_listings
  scraper_service.destroy
end

desc 'Scrape portuguese listings off KW website'
task scrape_pt: :environment do |_t, _args|
  scraper_service = RealEstateScraperService.new(headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.scrape_portuguese_listings
  scraper_service.destroy
end
