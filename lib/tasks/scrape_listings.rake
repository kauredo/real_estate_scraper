# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'
require 'task_helper'

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, _args|
  @url = 'https://www.kwportugal.pt/imoveis/agente-Sofia-Galvao-34365'

  def scrape_total
    @browser.refresh

    unless @browser.text.downcase.include? 'imóveis'
      ScrapeListingDetails.log 'KW website down'
      return 0
    end

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

      TaskHelper.run_and_retry_on_exception(method(:scrape_details), params: url)
      # scrape_details(url)
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
    puts "Started page #{page + 1}"
    scrape_page(page)
    puts "Finished page #{page + 1}"
    puts '*********'
    puts ''
  end

  @errors = []
  @lister = @url.split('/').last
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless' if ENV.fetch('HEADFULL', '').blank?
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  @browser.goto(@url)
  # TaskHelper.consent_cookies(@browser)

  puts @url

  # from url get the lister, it is the last part of the url (format agente-{lister}-id)
  @lister = @url.split('/').last.split('-')[1..-2].join(' ')

  ## Count total to see how many pages
  total = TaskHelper.run_and_retry_on_exception(method(:total_pages))
  # total = total_pages

  total.times do |page|
    TaskHelper.run_and_retry_on_exception(method(:one_page), params: page)
    # one_page(page)
  end

  @browser.close
  puts ''
  puts 'Completed'
end

desc 'Re-scrape listings off KW website'
task rescrape: :environment do |_t, _args|
  listings = Listing.all

  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless' if ENV.fetch('HEADFULL', '').blank?
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  def scrape_one(url, listing)
    I18n.with_locale(:pt) do
      TaskHelper.run_and_retry_on_exception(method(:scrape_details), params: url)
    end

    I18n.with_locale(:en) do
      TaskHelper.run_and_retry_on_exception(method(:scrape_language_details), params: listing) if listing.reload.deleted_at.nil?
    end
  end

  def scrape_details(url)
    ScrapeListingDetails.scrape_details(@browser, url)
  end

  def scrape_language_details(listing)
    ScrapeListingDetails.scrape_language_details(@browser, listing, 'English')
  end

  if listings.empty?
    puts 'No listings to scrape'
    return
  end

  @browser.goto 'https://www.kwportugal.pt/imoveis/agente-Sofia-Galvao-34365'
  unless @browser.text.downcase.include? 'imóveis'
    ScrapeListingDetails.log 'KW website down'
    return
  end

  listings.each do |listing|
    scrape_one(listing.url, listing)
  end

  @browser.close
end

desc 'Scrape one listing off KW website'
task :scrape_one, [:url] => :environment do |_t, arguments|
  url = arguments.url
  ActiveRecord::Base.connection_pool.release_connection
  listing = ActiveRecord::Base.connection_pool.with_connection do
    Listing.unscoped.find_by(url:)
  end

  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless' if ENV.fetch('HEADFULL', '').blank?
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  def scrape_one(url, listing)
    I18n.with_locale(:pt) do
      TaskHelper.run_and_retry_on_exception(method(:scrape_details), params: url)
    end

    I18n.with_locale(:en) do
      TaskHelper.run_and_retry_on_exception(method(:scrape_language_details), params: listing) if listing.reload.deleted_at.nil?
    end
  end

  def scrape_details(url)
    ScrapeListingDetails.scrape_details(@browser, url, true)
  end

  def scrape_language_details(listing)
    ScrapeListingDetails.scrape_language_details(@browser, listing, 'English')
  end

  @browser.goto 'https://www.kwportugal.pt/imoveis/agente-Sofia-Galvao-34365'
  unless @browser.text.downcase.include? 'imóveis'
    ScrapeListingDetails.log 'KW website down'
    return
  end

  scrape_one(url, listing)
  @browser.close
end

Rake::Task.tasks.each do |t|
  t.enhance do
    puts @browser
    @browser&.close
  end
end
