# frozen_string_literal: true

class TaskHelper
  def self.run_and_retry_on_exception(cmd, params: {}, tries: 0, max_tries: 5, delay: 10)
    tries += 1

    if params.present?
      cmd.call(params)
    else
      cmd.call
    end
  rescue StandardError => e
    Rails.logger.debug '~~~~~~~~~~~~~'
    Rails.logger.debug "Error: #{e}"
    Rails.logger.debug '~~~~~~~~~~~~~'
    Sentry.capture_exception(e)
    unless tries >= max_tries
      sleep delay
      retry
    end
    raise e
  end

  def self.consent_cookies(browser, sleep_time: 5)
    browser.cookies.clear
    browser.refresh
    sleep sleep_time
    banner = browser.div(class: 'cc-banner')
    return if banner.blank?

    banner.a(class: 'cc-btn').locate.click
    browser.refresh
  end
end
