desc "Scrape listings off KW website"
task scrape: :environment do
  def get_details(imovel_url, price)
    listing = Listing.new
    listing.url = imovel_url
    listing.price = price

    browser_imovel = Watir::Browser.new :chrome, headless: true
    browser_imovel.goto(imovel_url)
    listing.title = browser_imovel.title
    puts "Gathering data for listing #{listing.title}"

    js_doc = browser_imovel.div(class: "listing-images").wait_until(&:present?)
    images = Nokogiri::HTML(js_doc.inner_html)

    # status
    status = browser_imovel.div(class: "listing-status").wait_until(&:present?)
    listing.status = status.strip! if status.present?

    # stats
    listing.stats = browser_imovel.div(class: "key-data").wait_until(&:present?).divs(class: "data-item-row").map do |row|
      row.text.squish.split(": ")
    end.to_h

    # address
    listing.address = browser_imovel.div(class: "key-address").wait_until(&:present?).text

    # features
    listing.features = browser_imovel.div(class: "features-container").wait_until(&:present?).child(class: "row").children.map(&:text)

    # description
    listing.description = browser_imovel.div(class: "listing-details-desc").wait_until(&:present?).text

    browser_imovel.close
    res = images.css("img")
    listing.photos = res.map { |img| img.attr('src') }
    if listing.save
      puts "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      puts message
    end
  end

  def get_total
    url = "https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=en-US&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=1"
    browser = Watir::Browser.new :chrome, headless: true
    browser.goto(url)
    browser.div(class: "gallery-container").wait_until(&:present?)
    matches = browser.span(class: "num-matches").wait_until(&:present?)
    total = (matches.text.to_i/24.0).ceil
    browser.close
    total
  end

  def get_page(page)
    url = "https://www.kwportugal.pt/listings#?agentId=34672&agentName=Sofia%20Galv%C3%A3o&resCom=0&transactionType=0&lan=en-US&currency=EUR&filterVal=1026&refineSearch=1&pageNumber=#{page + 1}"
    browser = Watir::Browser.new :chrome, headless: true
    browser.goto(url)

    js_doc = browser.div(class: "gallery-container").wait_until(&:present?)
    imoveis = Nokogiri::HTML(js_doc.inner_html)
    browser.close
    res = imoveis.css(".gallery-item")

    res.each do |imovel|
      url = "https://www.kwportugal.pt#{imovel.css('a').map { |link| link['href'] }.uniq.first}"
      price = imovel.css('.gallery-price-main').text.strip!.gsub("€", "")[0...-1]
      next if Listing.where(url: url, price: price).present?

      begin
        puts "++++++++++++++"
        get_details(url, price)
        puts "++++++++++++++"
      rescue Watir::Wait::TimeoutError => e
        puts "ERROR:"
        puts e
      end
    end
  end

  @errors = []

  ## Count total to see how many pages
  puts "Getting total pages"
  total = get_total
  puts "Total: #{total} pages"

  total.times do |page|
    puts "*********"
    puts "Started page #{page}"
    get_page(page)
    puts "Finished page #{page}"
    puts "*********"
  end
end
