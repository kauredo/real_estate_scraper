# frozen_string_literal: true

class TaskHelper
  def self.run_and_retry_on_exception(cmd, params: {}, tries: 0, max_tries: 5, delay: 10)
    tries += 1

    if params.present?
      cmd.call(*params)
    else
      cmd.call
    end
  rescue StandardError => e
    ScrapeListingDetails.log '~~~~~~~~~~~~~'
    ScrapeListingDetails.log "[TaskHelper] Error: #{e}"
    ScrapeListingDetails.log '~~~~~~~~~~~~~'
    Sentry.capture_exception(e)
    unless tries >= max_tries
      sleep ENV['SLEEP_TIME']&.to_i || delay
      retry
    end
    raise e
  end

  def self.consent_cookies(browser)
    browser.cookies.clear
    browser.refresh
    sleep ENV['SLEEP_TIME']&.to_i || 5
    banner = browser.div(class: 'cc-banner')
    return if banner.blank?

    banner.a(class: 'cc-btn').locate.click
    browser.refresh
  end
end
