# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'
require 'task_helper'
require 'constants'

def setup_browser(headless: true)
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless' if headless
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  Watir::Browser.new(:chrome, options:)
end

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, _args|
  @url = Constants::RealEstateScraper::BASE_URL

  def scrape_total
    @browser.refresh

    return 0 if ScraperHelper.check_if_invalid?(@browser)

    @browser.div(class: 'properties').wait_until(timeout: 10, &:present?)
    matches = @browser.ul(class: 'pagination').wait_until(timeout: 10, &:present?).lis
    matches.count - 2
  end

  def scrape_page(page)
    url = @url + "/pagina-#{page + 1}"

    @browser.goto(url)

    js_doc = @browser.div(class: 'properties').wait_until(timeout: 10, &:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    res = imoveis.css('.property-tile2')

    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.compact.first}"

      ScrapeUrlJob.perform_async(url, false)
    end
  end

  def total_pages
    puts "Getting total pages for #{@lister}"
    total = scrape_total
    puts "Total: #{total} pages"
    total
  end

  def one_page(page)
    puts ''
    puts '*********'
    puts "Started page #{page + 1}"
    scrape_page(page)
    puts "Finished page #{page + 1}"
    puts '*********'
    puts ''
  end

  @errors = []
  @lister = @url.split('/').last
  @browser = setup_browser(headless: ENV.fetch('HEADFULL', '').blank?)

  @browser.goto(@url)

  puts @url

  @lister = @url.split('/').last.split('-')[1..-2].join(' ')

  total = total_pages

  total.times do |page|
    one_page(page)
  end

  @browser.close
  puts ''
  puts 'Completed'
end

desc 'Re-scrape listings off KW website'
task rescrape: :environment do |_t, _args|
  listings = Listing.all

  @browser = setup_browser(headless: ENV.fetch('HEADFULL', '').blank?)

  if listings.empty?
    puts 'No listings to scrape'
    return
  end

  @browser.goto Constants::RealEstateScraper::BASE_URL
  return if ScraperHelper.check_if_invalid?(@browser)

  listings.each do |listing|
    ScraperHelper.scrape_one(@browser, listing.url, listing)
  end

  @browser.close
end

desc 'Force re-scrape listings off KW website'
task force_rescrape: :environment do |_t, _args|
  listings = Listing.all

  if listings.empty?
    puts 'No listings to scrape'
    return
  end

  @browser = setup_browser(headless: ENV.fetch('HEADFULL', '').blank?)

  @browser.goto Constants::RealEstateScraper::BASE_URL
  return if ScraperHelper.check_if_invalid?(@browser)

  listings.each do |listing|
    ScraperHelper.scrape_one(@browser, listing.url, listing, force: true)
  end

  @browser.close
end

desc 'Scrape one listing off KW website'
task :scrape_one, %i[url force] => :environment do |_t, arguments|
  url = arguments.url
  force = arguments.force.to_s == 'true'

  ActiveRecord::Base.connection_pool.release_connection
  listing = ActiveRecord::Base.connection_pool.with_connection do
    Listing.unscoped.find_by(url:)
  end

  @browser = setup_browser(headless: ENV.fetch('HEADFULL', '').blank?)

  @browser.goto Constants::RealEstateScraper::BASE_URL
  return if ScraperHelper.check_if_invalid?(@browser)

  ScraperHelper.scrape_one(@browser, url, listing, force:)
  @browser.close
end

Rake::Task.tasks.each do |t|
  t.enhance do
    puts 'Closing browser'
    @browser&.close
  end
end
