# frozen_string_literal: true

module Scrapers
  class KwPortugalAdapter < BaseAdapter
    def get_all_listing_urls
      safe_goto(base_url)
      log base_url

      @lister = base_url.split('/').last(2).first.split('-').join(' ')
      accept_cookies

      log "Getting all listings for #{@lister}"
      listing_urls = scrape_all_listings
      log "Found #{listing_urls.size} listings"

      listing_urls
    end

    def scrape_listing_details(url, listing, force: false)
      safe_goto(url)
      return if check_if_invalid?

      ScraperHelper.scrape_one(@browser, url, listing, force:)
    end

    def scrape_listing_photos(listing)
      # KW photos are scraped as part of scrape_listing_details via ScraperHelper
      # This method is here for interface compliance
    end

    def supports_complexes?
      true
    end

    def scrape_complex(url, listing_complex)
      safe_goto(url)
      return if check_if_invalid?

      accept_cookies

      name = @browser.h1.wait_until(timeout: 10, &:present?).text

      # Scrape additional fields
      description = scrape_description
      video_link = scrape_video_link
      final_text = scrape_characteristics

      listing_complex.update(
        name:,
        description:,
        video_link:,
        final_text:
      )

      scrape_photos_for_complex(listing_complex)

      # Find all property links in the React Virtualized Table
      # Links have hrefs starting with /pt/Imovel/ (note capital I)
      listing_links = @browser.as(href: /\/pt\/Imovel\//i).wait_until(timeout: 10, &:present?)

      listing_links.each_with_index do |link_element, index|
        full_url = link_element.attribute_value('href')
        next if full_url.nil?

        clean_url = full_url.split('?').first
        listing = Listing.where('url LIKE ?', "#{clean_url}%").first || Listing.new(url: clean_url)
        listing.url = clean_url
        listing.listing_complex = listing_complex
        listing.title = "Imóvel #{index + 1} - #{name}" if listing.title.blank?

        if listing.persisted?
          listing.save
        else
          listing.save(validate: false)
        end

        log "Queuing ScrapeUrlJob for #{full_url}"
        wait_time = index * 2.minutes
        ScrapeUrlJob.set(wait: wait_time).perform_later(@tenant.id, listing.url, false)
      end
    end

    private

    def scrape_all_listings
      start_time = Time.current
      @browser.refresh
      return [] if check_if_invalid?

      accept_cookies

      total_listings = @browser.div(class: 'flex items-center flex-col md:flex-row gap-4 md:gap-0 justify-between w-full').wait_until(timeout: 10, &:present?)
      total_text = total_listings.text.match(/(\d+)\s/)[1].to_i

      button = @browser.button(text: 'Ver imóveis').wait_until(timeout: 10, &:present?)
      button_parent = button.parent
      id = button_parent.attribute_value('aria-controls')
      button.click if button.present? && id.present?

      listings_div = @browser.div(id:).div(class: 'px-4 h-full overflow-auto flex flex-col')

      listing_urls = []
      previous_count = 0
      no_change_counter = 0
      max_attempts = 10
      max_total_time = 30.minutes

      loop do
        log 'Getting current listings from the page...'
        # Get current listings
        current_listings = listings_div.as(class: 'w-0 h-0')
                                       .wait_until(timeout: 10, &:present?)
                                       .map(&:href)
                                       .uniq
                                       .compact
                                       .select { |url| url.start_with?('https://www.kwportugal.pt') && url.downcase.include?('/imovel/') }
                                       .map { |url| url.split('?').first }
                                       .uniq

        listing_urls = current_listings

        log "Found #{listing_urls.size} listings (target: #{total_text})"

        # Break conditions
        if Time.current - start_time > max_total_time
          log "Scraping timed out after #{max_total_time / 60} minutes"
          break
        end
        break if listing_urls.size >= total_text
        break if no_change_counter >= max_attempts

        # Check if we're making progress
        if listing_urls.size == previous_count
          no_change_counter += 1
          log "No new listings loaded (attempt #{no_change_counter}/#{max_attempts})"
        else
          no_change_counter = 0
        end

        previous_count = listing_urls.size

        # Try to load more content
        load_more_content(listings_div)
      end

      log "Final count: #{listing_urls.size} listings"
      listing_urls
    end

    def load_more_content(listings_div)
      log 'Loading more content...'
      # Scroll to bottom
      @browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', listings_div)

      # Try clicking "Ver mais" if present
      if listings_div.button(text: 'Ver mais').present?
        begin
          listings_div.button(text: 'Ver mais').click
          log "Clicked 'Ver mais' button"
        rescue StandardError => e
          log "Failed to click 'Ver mais': #{e.message}"
        end
      else
        # If no button, try scrolling again
        log "'Ver mais' button not found, scrolling to load more listings"
        @browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', listings_div)
      end
    end

    def scrape_photos_for_complex(listing_complex)
      # Parse JSON-LD structured data which contains all image URLs in an array
      json_ld_data = parse_json_ld_data
      return unless json_ld_data

      images = json_ld_data['images'] || []
      log "Found #{images.size} images in JSON-LD data"

      images.each_with_index do |image_data, index|
        photo_url = image_data['url']

        if photo_url.blank?
          log "Skipping blank photo URL for photo #{index + 1}"
          next
        end

        photo = listing_complex.photos.find_or_initialize_by(original_url: photo_url)
        photo.remote_image_url = photo_url
        photo.main = index.zero?
        photo.order = index + 1
        photo.tenant = @tenant

        if photo.new_record? || photo.changed?
          if photo.save
            log "Saved photo ##{index + 1} for listing_complex #{listing_complex.name}"
          else
            log "Failed to save photo for #{photo_url}: #{photo.errors.full_messages.join(', ')}"
          end
        else
          log "Photo for #{photo_url} already exists, skipping."
        end
      end
    rescue StandardError => e
      log "Failed to scrape photos: #{e.message}"
    end

    def scrape_description
      # Parse JSON-LD structured data which contains the full description
      json_ld_data = parse_json_ld_data
      return nil unless json_ld_data

      description = json_ld_data['description']
      return nil if description.blank?

      CGI.unescapeHTML(description).strip
    rescue StandardError => e
      log "Failed to scrape description: #{e.message}"
      nil
    end

    def scrape_video_link
      # Parse JSON-LD structured data which contains the video embedUrl
      json_ld_data = parse_json_ld_data
      return nil unless json_ld_data

      embed_url = json_ld_data.dig('video', 'embedUrl')
      return nil unless embed_url

      # Convert youtu.be URL to youtube.com/watch URL
      if embed_url.include?('youtu.be/')
        video_id = embed_url.split('/').last
        "https://www.youtube.com/watch?v=#{video_id}"
      else
        embed_url
      end
    rescue StandardError => e
      log "Failed to scrape video link: #{e.message}"
      nil
    end

    def parse_json_ld_data
      # Find the script tag with type="application/ld+json" and @type="RealEstateListing"
      script_elements = @browser.scripts(type: 'application/ld+json')

      script_elements.each do |script|
        json_text = script.inner_text
        next if json_text.blank?

        begin
          data = JSON.parse(json_text)
          return data if data['@type'] == 'RealEstateListing'
        rescue JSON::ParserError
          next
        end
      end

      nil
    rescue StandardError => e
      log "Failed to parse JSON-LD data: #{e.message}"
      nil
    end

    def scrape_characteristics
      # Find the characteristics section
      section = @browser.section(class: /md:col-start-3.*md:col-span-8.*col-span-4/)
      return nil unless section.present?

      characteristics = []

      # Find all list items with categories and their features
      section.lis.each do |li|
        # Get the category name (the first span with text-black class)
        category_span = li.span(class: /text-black/)
        category = category_span.text.strip if category_span.present?

        # Get all the feature items (spans with text-grey-03 class)
        features = li.spans(class: /text-grey-03/).map(&:text).reject(&:empty?)

        if category.present? && features.any?
          characteristics << "## #{category}\n#{features.map { |f| "- #{f}" }.join("\n")}"
        elsif features.any? && category.blank?
          # Features without a category
          characteristics << features.map { |f| "- #{f}" }.join("\n")
        end
      end

      return nil if characteristics.empty?

      "# Características\n\n#{characteristics.join("\n\n")}"
    rescue StandardError => e
      log "Failed to scrape characteristics: #{e.message}"
      nil
    end
  end
end
