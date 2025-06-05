# frozen_string_literal: true

class ScrapeUrlJob < ApplicationJob
  queue_as :individual_scraping
  queue_with_priority 5

  retry_on(StandardError, wait: 10.minutes, attempts: 3)
  discard_on(Timeout::Error) # Don't retry timeout errors

  around_perform do |job, block|
    # Kill the job after 10 minutes total
    Timeout.timeout(600) do
      block.call
    end
  rescue Timeout::Error => e
    ScrapeListingDetails.log("[ScrapeUrlJob] Timed out after 10 minutes for #{job.arguments.first}: #{e.message}")
    raise e # This will trigger discard_on
  end

  def perform(url, force = false)
    ScrapeListingDetails.log("[ScrapeUrlJob] is being performed for #{url}")

    scraper_service = RealEstateScraperService.new
    scraper_service.scrape_one(url, nil, force:)

    ScrapeListingDetails.log('[ScrapeUrlJob] DONE')
  ensure
    # Always cleanup, even if job fails/times out
    scraper_service&.destroy
  end
end
