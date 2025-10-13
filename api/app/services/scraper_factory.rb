# frozen_string_literal: true

class ScraperFactory
  class UnsupportedPlatformError < StandardError; end

  ADAPTERS = {
    kw_portugal: Scrapers::KwPortugalAdapter
    # Future platforms:
    # idealista: Scrapers::IdealistaAdapter,
    # century21: Scrapers::Century21Adapter
  }.freeze

  def self.create(browser:, tenant:)
    platform = tenant.scraper_platform

    if platform.nil?
      raise UnsupportedPlatformError, "No scraper_source_url set for tenant #{tenant.slug}"
    end

    unless ADAPTERS.key?(platform)
      raise UnsupportedPlatformError, "Unsupported platform: #{platform} for tenant #{tenant.slug}"
    end

    adapter_class = ADAPTERS[platform]
    adapter_class.new(browser:, tenant:)
  end
end
