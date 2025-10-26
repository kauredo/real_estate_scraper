# frozen_string_literal: true

class ScrapeComplexJob < ApplicationJob
  queue_as :individual_scraping
  queue_with_priority 5

  retry_on(StandardError, wait: 10.minutes, attempts: 3)

  def perform(tenant_id, url)
    tenant = Tenant.find(tenant_id)

    ActsAsTenant.with_tenant(tenant) do
      ScrapeListingDetails.log("[ScrapeComplexJob] Starting for #{url} for tenant: #{tenant.slug}")

      scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
      scraper_service.scrape_complex(url, nil)

      ScrapeListingDetails.log('[ScrapeComplexJob] DONE')
    ensure
      scraper_service&.destroy
    end
  end
end
