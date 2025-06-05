# frozen_string_literal: true

require 'task_helper'

module ScraperHelper
  def self.scrape_one(browser, url, listing, force: false)
    max_retries = 2
    retry_count = 0

    begin
      updated_listing = nil unless updated_listing.is_a?(Listing)

      I18n.with_locale(:pt) do
        updated_listing = ScrapeListingDetails.scrape_details(browser, url, force) unless updated_listing.is_a?(Listing)
      end

      updated_listing.save(validate: false) if updated_listing.is_a?(Listing) && updated_listing.valid?

      I18n.with_locale(:en) do
        if updated_listing.is_a?(Listing) && updated_listing.reload.deleted_at.nil?
          ScrapeListingDetails.scrape_language_details(browser, updated_listing, 'English')
        elsif listing && listing.reload.deleted_at.nil?
          ScrapeListingDetails.scrape_language_details(browser, listing, 'English')
        end
      end
    rescue Selenium::WebDriver::Error::UnknownError, Selenium::WebDriver::Error::TimeoutError, Selenium::WebDriver::Error::NoSuchElementError => e
      ScrapeListingDetails.log "[ScraperHelper] An error occurred during ScrapeHelper.scrape_one: #{e.message}"
      retry_count += 1

      # check if browser is still valid, otherwise recreate it
      unless browser.exists?
        browser.quit
        browser = ScraperHelper.setup_browser
      end

      # Check if we should retry
      if retry_count < max_retries
        retry
      else
        ScrapeListingDetails.log "[ScraperHelper] Failed to scrape after #{max_retries} attempts."
        raise e
      end
    end
  end

  def self.check_if_invalid?(browser)
    sleep ENV['SLEEP_TIME']&.to_i || 5 # wait for the page to load fully
    valid = browser.text.downcase.include? 'imóveis'
    if valid
      false
    else
      ScrapeListingDetails.log '[ScraperHelper] KW website down'
      true
    end
  end

  def self.setup_browser(headless: true)
    args = [
      '--disable-dev-shm-usage',
      '--enable-features=NetworkService,NetworkServiceInProcess',
      '--window-size=1280,800',
      '--no-sandbox',
      '--incognito',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security', # Can help with strict sites
      '--page-load-strategy=eager', # Don't wait for ALL resources
      '--aggressive-cache-discard',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    ]
    args << '--headless=new' if headless

    options = Selenium::WebDriver::Chrome::Options.new(args:)

    options.binary = '/opt/chrome-linux64/chrome' if Rails.env.production? || Rails.env.staging?

    # Add service with logging for debugging
    service = Selenium::WebDriver::Chrome::Service.new
    if Rails.env.production? || Rails.env.staging?
      binary_path = '/opt/chrome-linux64/chrome'
      options.binary = binary_path

      service.args << '--verbose'
      service.args << '--log-path=/tmp/chromedriver.log'
    end

    max_attempts = 3
    attempts = 0
    begin
      browser = Watir::Browser.new(:chrome, options:, service:)

      # Set timeouts after browser creation
      browser.driver.manage.timeouts.page_load = 60
      browser.driver.manage.timeouts.implicit_wait = 10
      browser.driver.manage.timeouts.script_timeout = 30 # Add script timeout

      # Test browser is working
      browser.driver.current_url # This will fail fast if browser isn't working

      browser
    rescue Net::ReadTimeout, Selenium::WebDriver::Error::WebDriverError => e
      ScrapeListingDetails.log "[ScraperHelper] Attempt #{attempts + 1} failed: #{e.message}"
      attempts += 1
      raise e unless attempts < max_attempts

      sleep(2**attempts)
      retry
    end
  end

  def self.accept_cookies(browser)
    count = 0
    begin
      # Get the shadow root and then find elements within it
      aside_element = browser.element(id: 'usercentrics-cmp-ui')
      shadow_root = browser.execute_script('return arguments[0].shadowRoot', aside_element)

      # Now search within the shadow root
      accept_button = browser.execute_script(
        'return arguments[0].querySelector("button[data-testid*=accept], button[id*=accept]")',
        shadow_root
      )

      accept_button&.click
      ScrapeListingDetails.log 'Cookies accepted'
    rescue StandardError => _e
      count += 1
      retry if count < 3

      ScrapeListingDetails.log 'Failed to accept cookies'
    end
  end
end
