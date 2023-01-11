require 'selenium-webdriver'

desc 'Scrape listings off KW website'
task :scrape, [:url] => :environment do |_t, args|
  args.with_defaults(url: 'https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=en-US&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1')
  @url = args.url

  def get_details(imovel_url, price)
    listing = Listing.find_or_initialize_by(url: imovel_url)
    listing.price = price

    @browser.goto(imovel_url)
    listing.title = @browser.title
    puts "Gathering data for listing #{listing.title}"

    js_doc = @browser.div(class: 'listing-images').wait_until(&:present?)
    images = Nokogiri::HTML(js_doc.inner_html)

    # status
    status = @browser.div(class: 'listing-status').wait_until(&:present?)
    listing.status = status.text.strip if status.present?

    # stats
    count = 0
    begin
      listing.stats = @browser.div(class: 'key-data').wait_until(&:present?).divs(class: 'data-item-row').map do |row|
        row.text.squish.split(': ')
      end.to_h
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # address
    count = 0
    begin
      listing.address = @browser.div(class: 'key-address').wait_until(&:present?).text&.squish
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # features
    count = 0
    begin
      listing.features = @browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description = @browser.div(class: 'listing-details-desc').wait_until(&:present?).text

    # @browser.close
    res = images.css('img')
    listing.photos = res.map { |img| img.attr('src') }

    listing.colleague = Colleague.find_by(name: @lister) if @lister != 'Sofia Galvão'

    # # geo data
    # listing.location = get_location(listing.address)
    listing.title&.gsub! 'm2', 'm²'
    listing.description&.gsub! 'm2', 'm²'
    listing.stats['Área Útil']&.gsub! 'm 2', 'm²'
    listing.stats['Área Bruta (CP)']&.gsub! 'm 2', 'm²'
    listing.stats['Área do Terreno']&.gsub! 'm 2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      puts message
    end
  end

  def get_total
    @browser.goto(@url)
    @browser.div(class: 'gallery-container').wait_until(&:present?)
    matches = @browser.span(class: 'num-matches').wait_until(&:present?)
    (matches.text.to_i / 24.0).ceil
    # @browser.close
  end

  def get_page(page)
    url = "#{@url.slice(0...(@url.index('&pageNumber')))}&pageNumber=#{page + 1}"
    @browser.goto(url)

    js_doc = @browser.div(class: 'gallery-container').wait_until(&:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    # @browser.close
    res = imoveis.css('.gallery-item')

    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.first}"
      price = imovel.css('.gallery-price-main').text.strip!.gsub('€', '')[0...-1]
      next if Listing.unscoped.where(url:, price:).present?

      begin
        puts '++++++++++++++'
        get_details(url, price)
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

  options = Selenium::WebDriver::Chrome::Options.new(args: ['headless', 'disable-dev-shm-usage',
                                                            '--enable-features=NetworkService,NetworkServiceInProcess'])
  @browser = Watir::Browser.new(:chrome, options:)

  ## Count total to see how many pages
  begin
    puts "Getting total pages for #{@lister}"
    total = get_total
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
    get_page(page)
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

task :special_scrape, :url do |_t, args|
  args.with_defaults(url: 'https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=en-US&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1')
  # puts "Args with defaults were: #{args}"
  puts args.url
end
