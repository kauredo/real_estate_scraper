# frozen_string_literal: true

class ScrapeAll < ApplicationJob
  queue_as :bulk_scraping
  queue_with_priority 10

  retry_on(StandardError, wait: 40.minutes, attempts: 2)
  discard_on(Timeout::Error) # Don't retry timeout errors

  around_perform do |_job, block|
    block.call
  rescue Timeout::Error => e
    ScrapeListingDetails.log("[ScrapeAll] Timed out after 40 minutes: #{e.message}")
    raise e # This will trigger discard_on
  end

  def perform
    ScrapeListingDetails.log '[ScrapeAll] is being performed'

    scraper_service = RealEstateScraperService.new
    scraper_service.scrape_all

    # Only queue follow-up jobs if scraping completed successfully
    FixDuplicatesJob.perform_later

    ScrapeListingDetails.log '[ScrapeAll] DONE'
  ensure
    # Always cleanup, even if job fails/times out
    scraper_service&.destroy
  end
end
