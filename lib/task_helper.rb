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
    puts '~~~~~~~~~~~~~'
    puts "Error: #{e}"
    puts '~~~~~~~~~~~~~'
    Sentry.capture_exception(e)
    unless tries >= max_tries
      sleep delay
      retry
    end
  end

  def self.consent_cookies(browser)
    browser.cookies.clear
    browser.refresh
    sleep 5
    banner = browser.div(class: 'cc-banner')
    return unless banner.present?

    banner.a(class: 'cc-btn').locate.click
    browser.refresh
  end
end
