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
    # count = 0
    # begin
    #   listing.features = @browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    # rescue StandardError => e
    #   count += 1
    #   retry if count < 3
    # end

    # description
    listing.description_en = @browser.divs(class: 'listing-details-desc').wait_until(&:present?).map(&:text).reject { |d| d.empty? }.first

    # # geo data
    listing.description_en&.gsub! 'm2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title}"
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
    l.title_en.blank? || l.status_en.blank? || l.description_en.blank?
  end

  listings.each do |listing|
    puts ''
    puts '*********'
    puts "Started listing #{listing.id}"
    scrape_details(listing)
    puts "Finished listing #{listing.id}"
    puts '*********'
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
