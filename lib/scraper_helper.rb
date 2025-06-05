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

  # In ScraperHelper
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
      '--disable-web-security',
      '--aggressive-cache-discard',
      '--disable-images',           # NEW: Don't load images to save bandwidth
      '--memory-pressure-off',      # NEW: Reduce memory pressure
      '--max_old_space_size=1024',  # NEW: Limit V8 memory
      # '--single-process',           # NEW: Use single process (risky but uses less memory)
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    ]
    args << '--headless=new' if headless

    options = Selenium::WebDriver::Chrome::Options.new(args:)
    options.binary = '/opt/chrome-linux64/chrome' if Rails.env.production? || Rails.env.staging?
    options.page_load_strategy = :normal

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
      Timeout.timeout(120) do # 60 second timeout for browser setup
        browser = Watir::Browser.new(:chrome, options:, service:)

        # Set more aggressive timeouts
        # browser.driver.manage.timeouts.page_load = 60 # Reduced from 120
        # browser.driver.manage.timeouts.implicit_wait = 10  # Reduced from 20
        # browser.driver.manage.timeouts.script_timeout = 30 # Reduced from 60
        # browser.driver.options[:read_timeout] = 60 if browser.driver.respond_to?(:options)

        # Quick test with timeout
        Timeout.timeout(30) do
          browser.driver.current_url
        end

        browser
      end
    rescue Net::ReadTimeout, Selenium::WebDriver::Error::WebDriverError, Timeout::Error => e
      ScrapeListingDetails.log "[ScraperHelper] Browser setup attempt #{attempts + 1} failed: #{e.message}"
      attempts += 1

      begin
        browser&.quit
      rescue StandardError
        nil
      end

      raise "Failed to create browser after #{max_attempts} attempts: #{e.message}" unless attempts < max_attempts

      sleep(5 + 2**attempts)
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

  def self.safe_goto(browser, url)
    # Use Watir's goto with timeout instead of Ruby's Timeout
    browser.goto(url)

    # Wait for page to be in a ready state
    browser.wait_until(timeout: 30) do
      browser.execute_script('return document.readyState') == 'complete'
    end
  rescue Watir::Wait::TimeoutError => e
    ScrapeListingDetails.log "Watir timeout while navigating to #{url}: #{e.message}"
    raise e
  rescue Net::ReadTimeout, Net::TimeoutError => e
    ScrapeListingDetails.log "Network timeout while navigating to #{url}: #{e.message}"
    raise e
  rescue Selenium::WebDriver::Error::TimeoutError => e
    ScrapeListingDetails.log "WebDriver timeout while navigating to #{url}: #{e.message}"
    raise e
  end
end
