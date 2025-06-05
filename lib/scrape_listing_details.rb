# frozen_string_literal: true

require 'task_helper'

class ScrapeListingDetails
  def self.scrape_details(browser, imovel_url, force = false)
    return unless browser

    log "Scraping details for listing at #{imovel_url}"

    # Navigate to the listing URL and check if the website is available
    website_avaliable = navigate_and_check_website(browser, imovel_url)
    return unless website_avaliable

    ScraperHelper.accept_cookies(browser)
    toggle_language(browser, 'Português')
    gather_listing_data(browser, imovel_url, force)
  end

  def self.scrape_language_details(browser, listing, language)
    return unless browser

    website_avaliable = navigate_and_check_website(browser, listing.url)
    return unless website_avaliable

    toggle_language(browser, language)
    update_translatable_listing_fields(browser, listing)
  end

  def self.navigate_and_check_website(browser, url, delete: false)
    ScraperHelper.safe_goto(browser, url)
    check_website_availability(browser, url, delete)
  end

  def self.check_website_availability(browser, url, delete)
    sleep ENV['SLEEP_TIME']&.to_i || 5 # wait for the page to load fully
    unless browser.text.downcase.include? 'imóveis'
      log 'KW website down'
      return false
    end
    # Check if the page contains '404' to determine if the listing is unavailable
    return true unless browser.text.downcase.include?('404')

    log 'listing unavailable on KW website, it will be destroyed'
    destroy_listing_if_exists(url) if delete
    false
  end

  def self.toggle_language(browser, target_language)
    current_url = browser.url

    # Map language names to URL path segments
    language_map = {
      'Português' => 'pt',
      'English' => 'en'
    }

    target_lang_code = language_map[target_language] || target_language.downcase

    # Replace the language code in the URL
    # This handles both /pt/ and /en/ in the URL path
    new_url = current_url.gsub(%r{/(pt|en)/}, "/#{target_lang_code}/")

    # Navigate to the new URL

    ScraperHelper.safe_goto(browser, new_url)

    # Wait for page to load
    sleep ENV['SLEEP_TIME']&.to_i || 5
  end

  def self.gather_listing_data(browser, imovel_url, force)
    title = browser.h1.text.gsub('m2', 'm²')
    url = browser.url
    log "Gathering data for listing \"#{title}\""

    listing = find_or_initialize_listing(imovel_url, title, url)

    if !force && listing.persisted? && listing.translations.any? { |t| t.locale == 'pt' && t.title == title }
      log "Listing \"#{listing.title}\" already exists"
      return listing
    end

    update_listing_fields(browser, listing, force)
  end

  def self.update_listing_fields(browser, listing, force)
    listing.title = browser.h1.text.gsub('m2', 'm²')
    listing.url = browser.url
    listing.status = 1

    listing.populate_type_and_objective

    price = extract_price(browser)
    if price
      price = price.gsub(/\D/, '')
      listing.price = price
    end

    stats = extract_stats(browser)
    listing.stats = stats if stats

    address = extract_address(browser)
    listing.address = address if address

    features = extract_features(browser)
    listing.features = features if features

    description = extract_description(browser)
    listing.description = description if description

    if listing.photos.blank? || force
      photos = extract_images(browser)
      listing.photos = photos if photos
    end

    save_listing(listing)
  end

  def self.update_translatable_listing_fields(browser, listing)
    log "Gathering translated data for listing \"#{listing.title_pt}\""

    listing.title = browser.h1.text.gsub('m2', 'm²')

    features = extract_features(browser)
    listing.features = features if features

    description = extract_description(browser)
    listing.description = description.gsub!('m2', 'm²') if description

    save_listing(listing)
  end

  def self.extract_price(browser)
    count = 0
    begin
      texts = browser.div(id: 'propertyHeader').wait_until(timeout: 10, &:present?)&.ps&.map(&:text)
      texts.find { |text| text.downcase.include?('€') }
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_stats(browser)
    count = 0
    begin
      stats = {}

      # Wait for the stats container to be present
      stats_container = browser.div(class: 'gap-2 items-center flex').wait_until(timeout: 10, &:present?)
      return {} unless stats_container

      # Find all property info containers
      containers = browser.divs(class: 'z-20 flex flex-row').wait_until(timeout: 10, &:present?)

      containers.each_with_index do |container, index|
        svg = container.svg.wait_until(timeout: 10, &:present?)
        number_elem = container.p(class: /text-grey-01/).wait_until(timeout: 10, &:present?)

        next unless svg.exists? && number_elem.exists?

        # Scroll container into view
        browser.execute_script("arguments[0].scrollIntoView({block: 'center'});", container)
        sleep(0.3)

        number = number_elem.text.strip
        description = get_stat_description(browser, svg, container, index)

        # Map to appropriate stat key based on index or description
        stat_key = determine_stat_key(description, index, number)

        stats[stat_key] = number if stat_key

      rescue StandardError => e
        log "Error extracting stat #{index}: #{e.message}"
      end

      stats
    rescue StandardError => _e
      count += 1
      retry if count < 3

      {}
    end
  end

  def self.get_stat_description(browser, svg, container, index)
    # Method 1: Check for tooltip attributes
    %w[title data-tooltip aria-label data-original-title].each do |attr|
      value = svg.attribute_value(attr) || container.attribute_value(attr)
      return value if value.present?
    end

    # Method 2: Try hover for tooltip
    begin
      svg.hover
      sleep(0.5)

      tooltip_selectors = [
        '[role="tooltip"]',
        '.tooltip',
        '.popover',
        '[data-tooltip-show="true"]'
      ]

      tooltip_selectors.each do |selector|
        tooltip = browser.element(css: selector)
        return tooltip.text.strip if tooltip.exists? && !tooltip.text.strip.empty?
      end
    rescue StandardError => e
      log "Hover failed for stat #{index}: #{e.message}"
    end

    # Method 3: JavaScript hover simulation
    script = <<~JS
      const svg = arguments[0];
      svg.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));

      setTimeout(() => {
        const tooltip = document.querySelector('[role="tooltip"], .tooltip, .popover');
        return tooltip ? tooltip.textContent.trim() : null;
      }, 200);
    JS

    result = browser.execute_script(script, svg)
    return result if result.present?

    # Fallback: determine by index
    get_default_description_by_index(index)
  end

  def self.determine_stat_key(description, index, _number)
    description_lower = description&.downcase || ''

    # Try to determine from description first
    if description_lower.include?('quarto') || description_lower.include?('bedroom')
      'Quartos'
    elsif description_lower.include?('casa de banho') || description_lower.include?('bathroom') || description_lower.include?('wc')
      'Casas de banho'
    elsif description_lower.include?('área') || description_lower.include?('area') || description_lower.include?('m²') || description_lower.include?('m2')
      'Área útil'
    elsif description_lower.include?('ano') || description_lower.include?('year')
      'Ano de construção'
    elsif description_lower.include?('estacionamento') || description_lower.include?('parking') || description_lower.include?('garagem') || description_lower.include?('garagens')
      'Estacionamentos'
    elsif description_lower.include?('sala') || description_lower.include?('living room') || description_lower.include?('salas')
      'Salas'
    else
      # Fallback to index-based determination
      case index
      when 0 then 'Quartos'
      when 1 then 'Casas de banho'
      when 2 then 'Estacionamentos'
      when 3 then 'Área útil'
      else 'Característica da propriedade'
      end
    end
  end

  def self.get_default_description_by_index(index)
    case index
    when 0 then 'Quartos'
    when 1 then 'Casas de banho'
    when 2 then 'Estacionamentos'
    when 3 then 'Área útil'
    else 'Característica da propriedade'
    end
  end

  def self.extract_address(browser)
    count = 0
    begin
      browser.div(class: 'address-label').wait_until(timeout: 10, &:present?)&.p&.text&.squish
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_features(_browser)
    # count = 0
    # begin
    #   browser.ul(class: 'grid auto-rows-max').wait_until(timeout: 10, &:present?)&.lis&.map(&:text)
    # rescue StandardError => _e
    #   count += 1
    #   retry if count < 3

    #   []
    # end
    []
  end

  def self.extract_description(browser)
    count = 0
    begin
      browser.span(id: 'development-description').wait_until(timeout: 10, &:present?)&.ps&.last&.click
      sleep 1 # wait for the description to expand
      browser.span(id: 'development-description').wait_until(timeout: 10, &:present?)&.ps&.first&.text
    rescue StandardError => _e
      count += 1
      retry if count < 3

      nil
    end
  end

  def self.extract_images(browser)
    count = 0
    begin
      browser.execute_script('window.scrollTo(0, 0)')
      sleep 1
      browser.div(class: 'flex touch-pan-y touch-pinch-zoom').wait_until(timeout: 10, &:present?)&.div(class: 'cursor-grab')&.click
      sleep 1
      images = []
      image_divs = browser.divs(class: 'flex touch-pan-y touch-pinch-zoom').wait_until(timeout: 10, &:present?)
      # image_counts = image_divs.map { |div| div.images.count }
      most_images_div = image_divs[1]
      most_images_div.images.each do |image|
        next if image.src.blank?

        images << image.src if image.src.present? && image.src.start_with?('https://')
      end
      images.uniq
    rescue StandardError => _e
      count += 1
      retry if count < 3

      []
    end
  end

  def self.save_listing(listing)
    # ActiveRecord::Base.connection_pool.release_connection
    # ActiveRecord::Base.connection_pool.with_connection do
    if listing.save(validate: false)
      log "Finished listing \"#{listing.title}\""
    else
      log "ERROR: Listing at \"#{listing.url}\" has errors"
    end
    # end
    listing
  end

  def self.find_or_initialize_listing(imovel_url, title, url)
    # Fetch listings that match either old URL or new URL
    listings = Listing.unscoped
                      .includes(:translations)
                      .where('url = :imovel_url OR url = :url', imovel_url:, url:)

    # Filter by title if it exists
    matching_listing = listings.find do |listing|
      listing.translations.any? { |t| t.locale == 'pt' && t.title == title }
    end

    # Return the first match or find/initialize by title as fallback
    matching_listing || Listing.find_or_initialize_by(title:)
  end

  def self.destroy_listing_if_exists(url)
    listing = Listing.find_by(url:)
    return unless listing

    log 'listing unavailable on KW website, it will be destroyed'
    listing&.destroy
  end

  def self.log(message)
    puts message # rubocop:disable Rails/Output
    Rails.logger.info "[ScrapeListingDetails] #{message}"
  end
end
