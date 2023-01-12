# frozen_string_literal: true

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url)
    listing = Listing.find_or_initialize_by(url: imovel_url)

    browser.goto(imovel_url)
    listing.title_pt = browser.title
    puts "Gathering data for listing #{listing.title_pt}"

    # price
    price = browser.div(class: 'key-price').wait_until(&:present?).text
    listing.price = price

    # status
    status = browser.div(class: 'listing-status').wait_until(&:present?)
    if status.present?
      listing.status = case status.text.strip
                       when 'Novo' then 0
                       when 'Reservado' then 2
                       when 'Vendido' then 3
                       else 1
                       end
    end

    # stats
    count = 0
    begin
      listing.stats = browser.div(class: 'key-data').wait_until(&:present?).divs(class: 'data-item-row').map do |row|
        row.text.squish.split(': ')
      end.to_h
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # address
    count = 0
    begin
      listing.address = browser.div(class: 'key-address').wait_until(&:present?).text&.squish
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # features
    count = 0
    begin
      listing.features_pt = browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description_pt = browser.div(class: 'listing-details-desc').wait_until(&:present?).text

    # images
    unless listing.photos.present?
      js_doc = browser.div(class: 'listing-images').wait_until(&:present?)
      images = Nokogiri::HTML(js_doc.inner_html)
      res = images.css('img')
      listing.photos = res.map { |img| img.attr('src') }
    end

    # # geo data
    # listing.location = scrape_location(listing.address)
    listing.title&.gsub! 'm2', 'm²'
    listing.description_pt&.gsub! 'm2', 'm²'
    listing.stats['Área Útil']&.gsub! 'm 2', 'm²'
    listing.stats['Área Bruta (CP)']&.gsub! 'm 2', 'm²'
    listing.stats['Área do Terreno']&.gsub! 'm 2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      puts message
    end
  end

  def self.scrape_language_details(browser, listing, language)
    browser.goto(listing.url)

    toggle = browser.a(class: 'dropdown-toggle').wait_until(&:present?)
    toggle.click
    en = browser.a(text: language).wait_until(&:present?)
    en.click

    listing.title = browser.title
    puts "Gathering data for listing #{listing.title}"

    # features
    count = 0
    begin
      listing.features = browser.div(class: 'features-container').wait_until(&:present?).child(class: 'row').children.map(&:text)
    rescue StandardError => e
      count += 1
      retry if count < 3
    end

    # description
    listing.description = browser.divs(class: 'listing-details-desc').wait_until(&:present?).map(&:text).reject(&:empty?).first

    # # geo data
    listing.title&.gsub! 'm2', 'm²'
    listing.description&.gsub! 'm2', 'm²'

    if listing.save
      puts "Finished listing #{listing.title}"
    else
      message = "ERROR: Listing at #{listing.url} has errors"
      @errors << [listing, message]
      puts message
    end
  end
end
