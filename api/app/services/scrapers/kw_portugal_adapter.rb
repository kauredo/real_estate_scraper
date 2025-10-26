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

      name = @browser.h1.wait_until(timeout: 10, &:present?).text
      listing_complex.update(name:)
      scrape_photos_for_complex(listing_complex)

      listings = @browser.table(class: 'properties_table').wait_until(timeout: 10, &:present?).trs
      listings.each_with_index do |listing_element, index|
        relative_url = listing_element.attribute_value('data-href')
        next if relative_url.nil?

        full_url = "https://www.kwportugal.pt#{relative_url}"
        listing = Listing.find_or_initialize_by(url: full_url)
        listing.listing_complex = listing_complex
        listing.title = "Imóvel #{index} - #{name}" if listing.title.blank?

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
      photo_elements = @browser.div(class: 'gallery').imgs

      photo_elements.each_with_index do |img_element, index|
        photo_url = img_element.attribute_value('src')
        next if photo_url.blank?

        photo = listing_complex.photos.find_or_initialize_by(original_url: photo_url)
        photo.remote_image_url = photo_url
        photo.main = index.zero?
        photo.order = index + 1

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
    end
  end
end
