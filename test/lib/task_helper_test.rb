require 'test_helper'

class TaskHelperTest < ActiveSupport::TestCase
  test 'run_and_retry_on_exception retries command on exception' do
    cmd = -> { raise StandardError }
    assert_raises(StandardError) do
      TaskHelper.run_and_retry_on_exception(cmd, delay: 0.1)
    end

    cmd = -> { raise StandardError }
    assert_raises(StandardError) do
      TaskHelper.run_and_retry_on_exception(cmd, delay: 0.1, tries: 5, max_tries: 5)
    end
  end

  test 'run_and_retry_on_exception retries command with params on exception' do
    cmd = ->(params) { raise StandardError if params[:raise_error] }
    assert_raises(StandardError) do
      TaskHelper.run_and_retry_on_exception(cmd, delay: 0.1, params: { raise_error: true })
    end

    cmd = ->(params) { raise StandardError if params[:raise_error] }
    assert_nothing_raised do
      TaskHelper.run_and_retry_on_exception(cmd, delay: 0.1, params: { raise_error: false })
    end
  end

  class FakeCookies
    def clear
      # mock implementation for `cookies.clear`
    end
  end

  class FakeBanner
    def blank?
      false
    end

    def a(selector)
      raise ArgumentError, "Unexpected selector: #{selector.inspect}" unless selector[:class] == 'cc-btn'

      FakeElement.new
    end
  end

  class FakeElement
    def click
      # mock implementation for `a_element.click`
    end

    def locate
      self
    end
  end

  test 'consent_cookies clears and accepts cookies banner' do
    browser = Object.new
    these_cookies = FakeCookies.new
    banner = FakeBanner.new

    def browser.cookies
      FakeCookies.new
    end

    def browser.refresh
      # Nothing
    end

    def browser.div(selector)
      raise ArgumentError, "Unexpected selector: #{selector.inspect}" unless selector[:class] == 'cc-banner'

      FakeBanner.new
    end

    TaskHelper.consent_cookies(browser)
  end
end
