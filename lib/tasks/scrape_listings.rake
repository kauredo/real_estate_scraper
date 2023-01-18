# frozen_string_literal: true

require 'selenium-webdriver'
require 'scrape_listing_details'

desc 'Scrape listings off KW website'
task scrape: :environment do |_t, args|
  @url = 'https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=en-US&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1'

  def scrape_total
    @browser.goto(@url)
    @browser.div(class: 'gallery-container').wait_until(&:present?)
    matches = @browser.span(class: 'num-matches').wait_until(&:present?)
    (matches.text.to_i / 24.0).ceil
    # @browser.close
  end

  def scrape_page(page)
    url = "#{@url.slice(0...(@url.index('&pageNumber')))}&pageNumber=#{page + 1}"
    @browser.goto(url)

    js_doc = @browser.div(class: 'gallery-container').wait_until(&:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    # @browser.close
    res = imoveis.css('.gallery-item')

    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.first}"
      next if Listing.unscoped.where(url:).present?

      begin
        puts '++++++++++++++'
        ScrapeListingDetails.scrape_details(browser, url)
        puts '++++++++++++++'
      rescue StandardError => e
        puts 'ERROR:'
        puts e
        retry
      end
    end
  end

  @errors = []
  @lister = Rack::Utils.parse_nested_query(@url)['agentName']
  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  @browser = Watir::Browser.new(:chrome, options:)

  ## Count total to see how many pages
  begin
    puts "Getting total pages for #{@lister}"
    total = scrape_total
    puts "Total: #{total} pages"
  rescue StandardError => e
    puts '~~~~~~~~~~~~~'
    puts "Error: #{e}"
    puts '~~~~~~~~~~~~~'
    retry
  end

  total.times do |page|
    puts ''
    puts '*********'
    puts "Started page #{page}"
    scrape_page(page)
    puts "Finished page #{page}"
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

desc 'Scrape one listing off KW website'
task :scrape_one, [:id] => :environment do |_t, arguments|
  id = arguments.id
  listing = Listing.find id
  url = listing.url

  args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
  args << 'headless'
  options = Selenium::WebDriver::Chrome::Options.new(args:)
  browser = Watir::Browser.new(:chrome, options:)

  ScrapeListingDetails.scrape_details(browser, url, true)
  I18n.with_locale(:en) do
    ScrapeListingDetails.scrape_language_details(browser, listing, 'English (United States)')
  end

  browser.close
end
