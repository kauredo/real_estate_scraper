# frozen_string_literal: true

class ScrapeUrlJob < ApplicationJob
  queue_as :individual_scraping
  queue_with_priority 5

  retry_on(StandardError, wait: 10.minutes, attempts: 3)
  discard_on(Timeout::Error)

  around_perform do |job, block|
    block.call
  rescue Timeout::Error => e
    ScrapeListingDetails.log("[ScrapeUrlJob] Timed out after 5 minutes for #{job.arguments.first}")
    raise e
  end

  def perform(url, force = false)
    start_time = Time.current
    ScrapeListingDetails.log("[ScrapeUrlJob] Starting #{url} at #{start_time}")

    scraper_service = RealEstateScraperService.new
    service_start = Time.current
    ScrapeListingDetails.log("[ScrapeUrlJob] Browser created in #{service_start - start_time} seconds")

    scraper_service.scrape_one(url, nil, force:)
    scrape_end = Time.current

    total_time = scrape_end - start_time
    ScrapeListingDetails.log("[ScrapeUrlJob] DONE for #{url} in #{total_time} seconds")
  ensure
    cleanup_start = Time.current
    scraper_service&.destroy
    cleanup_time = Time.current - cleanup_start
    ScrapeListingDetails.log("[ScrapeUrlJob] Cleanup completed in #{cleanup_time} seconds")
  end
end
