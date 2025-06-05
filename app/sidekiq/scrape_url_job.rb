# frozen_string_literal: true

class ScrapeUrlJob < ApplicationJob
  queue_as :individual_scraping
  queue_with_priority 5

  retry_on(StandardError, wait: 10.minutes, attempts: 3)
  discard_on(Timeout::Error)

  around_perform do |job, block|
    # Reduce to 5 minutes - no page should take 20 minutes
    Timeout.timeout(300) do
      block.call
    end
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
    cleanup_start = Time.current if defined?(cleanup_start).nil?
    scraper_service&.destroy
    ScrapeListingDetails.log("[ScrapeUrlJob] Cleanup completed in #{Time.current - cleanup_start} seconds")
  end
end
