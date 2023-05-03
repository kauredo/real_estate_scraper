# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'
require 'task_helper'

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, args|
  @url = 'https://www.kwportugal.pt/sofiagalvao'
  # @url = 'https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=pt-PT&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1'

  def scrape_total
    sleep 5
    @browser.refresh
    @browser.div(class: 'gallery-container').wait_until(&:present?)
    matches = @browser.lis(class: 'pagination-page').wait_until(&:present?)
    matches.count
  end

  def scrape_page(page)
    url = "#{@url.slice(0...(@url.index('&pageNumber')))}&pageNumber=#{page + 1}"
    @browser.goto(url)
    sleep 5
    @browser.refresh

    js_doc = @browser.div(class: 'gallery-container').wait_until(&:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    res = imoveis.css('.gallery-item')

    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.first}"
      next if Listing.unscoped.where(url:).present?

      TaskHelper.run_and_retry_on_exception(method(:scrape_details), params: url)
    end
  end

  def scrape_details(url)
    ScrapeListingDetails.scrape_details(@browser, url)
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
    puts "Started page #{page}"
    scrape_page(page)
    puts "Finished page #{page}"
    puts '*********'
    puts ''
  end

  @errors = []
  @lister = Rack::Utils.parse_nested_query(@url)['agentName']
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  @browser.goto(@url)
  TaskHelper.consent_cookies(@browser)

  puts @url

  properties = @browser.as(class: 'our-properties').detect(&:visible?)

  if properties
    puts 'found properties'
    properties.click
    sleep 2
    @url = @browser.url
  else
    puts 'no found properties'
    @url = 'https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=pt-PT&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1'
    @browser.goto(@url)
  end

  @lister = Rack::Utils.parse_nested_query(@url)['agentName']

  ## Count total to see how many pages
  total = TaskHelper.run_and_retry_on_exception(method(:total_pages))

  total.times do |page|
    TaskHelper.run_and_retry_on_exception(method(:one_page), params: page)
  end

  @browser.close
  puts ''
  puts 'Completed'
end

desc 'Scrape one listing off KW website'
task :scrape_one, [:url] => :environment do |_t, arguments|
  url = arguments.url
  listing = Listing.find_by(url:)

  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  ScrapeListingDetails.scrape_details(@browser, url, true)
  I18n.with_locale(:en) do
    ScrapeListingDetails.scrape_language_details(@browser, listing, 'English (United States)')
  end

  @browser.close
end

Rake::Task.tasks.each do |t|
  t.enhance do
    puts @browser
    @browser.close if @browser
  end
end
