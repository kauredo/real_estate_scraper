# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'
require 'task_helper'

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, args|
  @url = 'https://www.kwportugal.pt/imoveis/agente-Sofia-Galvao-34365'

  def scrape_total
    @browser.refresh
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

desc 'Scrape one listing off KW website'
task :scrape_one, [:url] => :environment do |_t, arguments|
  url = arguments.url
  ActiveRecord::Base.connection_pool.release_connection
  ActiveRecord::Base.connection_pool.with_connection do
    listing = Listing.unscoped.find_by(url:)

    args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
    args << 'headless' if ENV.fetch('HEADFULL', '').blank?
    options = Selenium::WebDriver::Chrome::Options.new(args:)
    @browser = Watir::Browser.new(:chrome, options:)

    I18n.with_locale(:pt) do
      ScrapeListingDetails.scrape_details(@browser, url, true)
    end

    I18n.with_locale(:en) do
      ScrapeListingDetails.scrape_language_details(@browser, listing, 'English')
    end
  end

  @browser.close
end

Rake::Task.tasks.each do |t|
  t.enhance do
    puts @browser
    @browser&.close
  end
end
