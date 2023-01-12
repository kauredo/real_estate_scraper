# frozen_string_literal: true

require 'selenium-webdriver'

desc 'Scrape english listings off KW website'
task :scrape_en, [:url] => :environment do |_t, args|

  def scrape_details(listing)
    @browser.goto(listing.url)

    toggle = @browser.a(class: 'dropdown-toggle').wait_until(&:present?)
    toggle.click
    en = @browser.a(text: 'English (United States)').wait_until(&:present?)
    en.click

    listing.title_en = @browser.title
    puts "Gathering data for listing #{listing.title_en}"

    # status
    status = @browser.div(class: 'listing-status').wait_until(&:present?)
    listing.status_en = status.text.strip if status.present?

    # features
    count = 0
    begin
      listing.features_en = @browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description_en = @browser.divs(class: 'listing-details-desc').wait_until(&:present?).map(&:text).reject { |d| d.empty? }.first

    # # geo data
    listing.description_en&.gsub! 'm2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title_en}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      puts message
    end
  end

  @errors = []
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  translations = Listing::Translation.where(locale: "en")
  ids = translations.select do |t|
    Listing::Translation.where(locale: "pt", title: t.title).present?
  end.map(&:listing_id)

  listings = Listing.all.select do |l|
    l.title_en.blank? || l.status_en.blank? || l.description_en.blank? || l.features_en.blank? || ids.include?(l.id)
  end

  puts "Found #{listings.size} listings"

  listings.each do |listing|
    puts ''
    puts "Started listing #{listing.id}"
    scrape_details(listing)
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
task :scrape_pt, [:url] => :environment do |_t, args|

  def scrape_details(listing)
    @browser.goto(listing.url)

    toggle = @browser.a(class: 'dropdown-toggle').wait_until(&:present?)
    toggle.click
    en = @browser.a(text: 'Português').wait_until(&:present?)
    en.click

    listing.title_pt = @browser.title
    puts "Gathering data for listing #{listing.title_pt}"

    # status
    status = @browser.div(class: 'listing-status').wait_until(&:present?)
    listing.status_pt = status.text.strip if status.present?

    # features
    count = 0
    begin
      listing.features_pt = @browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description_pt = @browser.divs(class: 'listing-details-desc').wait_until(&:present?).map(&:text).reject { |d| d.empty? }.first

    # # geo data
    listing.description_pt&.gsub! 'm2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title_pt}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      puts message
    end
  end

  @errors = []
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  listings = Listing.all.select do |l|
    l.title_pt.blank? || l.status_pt.blank? || l.description_pt.blank?
  end

  listings.each do |listing|
    puts ''
    puts "Started listing #{listing.id}"
    scrape_details(listing)
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
