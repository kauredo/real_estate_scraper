# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'

desc 'Scrape english listings off KW website'
task scrape_en: :environment do |_t, args|
  @errors = []
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  translations = Listing::Translation.where(locale: 'en')
  ids = translations.select do |t|
    Listing::Translation.where(locale: 'pt', title: t.title).present?
  end.map(&:listing_id)

  listings = Listing.all.select do |l|
    l.title_en.blank? || l.description_en.blank? || l.features_en.blank? || ids.include?(l.id)
  end

  puts "Found #{listings.size} listings"

  listings.each do |listing|
    puts ''
    puts "Started listing #{listing.id}"
    I18n.with_locale(:en) do
      ScrapeListingDetails.scrape_language_details(@browser, listing, 'English (United States)')
    end
    puts "Finished listing #{listing.id}"
    puts ''
  rescue StandardError => e
    puts '~~~~~~~~~~~~~'
    puts "Error: #{e}"
    puts '~~~~~~~~~~~~~'
    retry
  end

  @browser.close
  puts ''
  puts 'Completed'
end

desc 'Scrape portuguese listings off KW website'
task scrape_pt: :environment do |_t, args|
  @errors = []
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  listings = Listing.all.select do |l|
    l.title_pt.blank? || l.description_pt.blank?
  end

  listings.each do |listing|
    puts ''
    puts "Started listing #{listing.id}"
    I18n.with_locale(:pt) do
      ScrapeListingDetails.scrape_language_details(@browser, listing, 'Português')
    end
    puts "Finished listing #{listing.id}"
    puts ''
  rescue StandardError => e
    puts '~~~~~~~~~~~~~'
    puts "Error: #{e}"
    puts '~~~~~~~~~~~~~'
    retry
  end

  @browser.close
  puts ''
  puts 'Completed'
end
