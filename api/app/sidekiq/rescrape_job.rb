# frozen_string_literal: true

class RescrapeJob < ApplicationJob
  queue_as :bulk_scraping
  queue_with_priority 8

  def perform(tenant_id = nil)
    tenants = tenant_id ? [Tenant.find(tenant_id)] : Tenant.active.where.not(scraper_source_url: nil)

    tenants.each do |tenant|
      ScrapeListingDetails.log "[RescrapeJob] Starting rescrape for tenant: #{tenant.slug}"

      ActsAsTenant.with_tenant(tenant) do
        scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
        scraper_service.rescrape
      ensure
        scraper_service&.destroy
      end
    end
  end
end
