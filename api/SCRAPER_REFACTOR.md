# Scraper Refactor: Multi-Tenant & Multi-Platform Architecture

## Table of Contents
- [Current Architecture Problems](#current-architecture-problems)
- [New Architecture Overview](#new-architecture-overview)
- [Implementation Plan](#implementation-plan)
- [Platform Adapter Interface](#platform-adapter-interface)
- [Migration Guide](#migration-guide)
- [Adding New Platforms](#adding-new-platforms)
- [Testing Strategy](#testing-strategy)

---

## Current Architecture Problems

### 1. Hardcoded Single Source
```ruby
# lib/constants.rb
module Constants
  module RealEstateScraper
    BASE_URL = 'https://www.kwportugal.pt/pt/agente/Sofia-Galvao/34365'
  end
end
```
**Problem**: Only supports Sofia Galvão's KW Portugal page. Cannot scrape for other agents or platforms.

### 2. No Tenant Association
```ruby
# app/services/real_estate_scraper_service.rb
def initialize(headless: true)
  @browser = ScraperHelper.setup_browser(headless:)
  @url = Constants::RealEstateScraper::BASE_URL  # ❌ Hardcoded
end
```
**Problem**: Scraper doesn't know which tenant it's scraping for.

### 3. Platform-Specific Logic Embedded
```ruby
# Hardcoded KW-specific selectors
listings_div.as(class: 'w-0 h-0')  # KW-specific CSS classes
button(text: 'Ver imóveis')        # KW-specific Portuguese text
```
**Problem**: Adding support for other platforms (Idealista, Century21, RE/MAX) requires rewriting the entire scraper.

### 4. Single-Tenant Database Design
```ruby
# Current listings have no tenant_id
class Listing < ApplicationRecord
  # Missing: belongs_to :tenant
end
```
**Problem**: All listings mixed together, no tenant isolation.

---

## New Architecture Overview

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    Scraper Jobs                             │
│  (ScrapeAll, ScrapeUrlJob, RescrapeJob)                    │
│                                                              │
│  • Accept tenant_id parameter                               │
│  • Set Current.tenant context                               │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│           RealEstateScraperService (Refactored)             │
│                                                              │
│  • Accepts tenant on initialization                         │
│  • Delegates to platform-specific adapter                   │
│  • Manages browser lifecycle                                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    ScraperFactory                           │
│                                                              │
│  • Detects platform from tenant.scraper_source_url         │
│  • Returns appropriate adapter instance                     │
│  • Supports: KW, Idealista, Century21, etc.                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│               Platform Adapters (Strategy Pattern)          │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ KwPortugalAdapter│  │ IdealistaAdapter │  ...           │
│  │                  │  │                  │                 │
│  │ • get_listings   │  │ • get_listings   │                │
│  │ • scrape_details │  │ • scrape_details │                │
│  │ • scrape_photos  │  │ • scrape_photos  │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  All inherit from: Scrapers::BaseAdapter                   │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. **Tenant Model Enhancement**
```ruby
class Tenant < ApplicationRecord
  # New field
  # scraper_source_url: string - URL to scrape listings from

  validates :scraper_source_url,
            format: { with: URI::DEFAULT_PARSER.make_regexp },
            allow_blank: true

  def scraper_platform
    return nil if scraper_source_url.blank?

    uri = URI.parse(scraper_source_url)
    case uri.host
    when /kwportugal\.pt/ then :kw_portugal
    when /idealista\.pt/ then :idealista
    when /century21\.pt/ then :century21
    else :unknown
    end
  end
end
```

#### 2. **Base Adapter Interface**
```ruby
# app/services/scrapers/base_adapter.rb
module Scrapers
  class BaseAdapter
    attr_reader :browser, :tenant, :base_url

    def initialize(browser:, tenant:)
      @browser = browser
      @tenant = tenant
      @base_url = tenant.scraper_source_url
    end

    # Must be implemented by subclasses
    def get_all_listing_urls
      raise NotImplementedError, "#{self.class} must implement #get_all_listing_urls"
    end

    def scrape_listing_details(url, listing, force: false)
      raise NotImplementedError, "#{self.class} must implement #scrape_listing_details"
    end

    def scrape_listing_photos(listing)
      raise NotImplementedError, "#{self.class} must implement #scrape_listing_photos"
    end

    # Optional: Override if platform supports complexes
    def supports_complexes?
      false
    end

    def scrape_complex(url, listing_complex)
      raise NotImplementedError unless supports_complexes?
    end

    protected

    # Helper methods available to all adapters
    def safe_goto(url)
      ScraperHelper.safe_goto(@browser, url)
    end

    def log(message)
      ScrapeListingDetails.log("[#{self.class.name}] [Tenant: #{@tenant.slug}] #{message}")
    end

    def accept_cookies
      ScraperHelper.accept_cookies(@browser)
    end
  end
end
```

#### 3. **KW Portugal Adapter**
```ruby
# app/services/scrapers/kw_portugal_adapter.rb
module Scrapers
  class KwPortugalAdapter < BaseAdapter
    def get_all_listing_urls
      safe_goto(base_url)
      accept_cookies

      # KW-specific: Get total count
      total_listings = @browser.div(class: 'flex items-center flex-col md:flex-row gap-4')
      total_text = total_listings.text.match(/(\d+)\s/)[1].to_i

      # KW-specific: Open listings panel
      button = @browser.button(text: 'Ver imóveis').wait_until(timeout: 10, &:present?)
      button_parent = button.parent
      id = button_parent.attribute_value('aria-controls')
      button.click if button.present? && id.present?

      listings_div = @browser.div(id:).div(class: 'px-4 h-full overflow-auto flex flex-col')

      # Scroll and collect URLs
      listing_urls = []
      loop do
        current_listings = listings_div.as(class: 'w-0 h-0')
          .wait_until(timeout: 10, &:present?)
          .map(&:href)
          .uniq
          .compact
          .select { |url| url.include?('/imovel/') }

        listing_urls = current_listings
        break if listing_urls.size >= total_text

        # Load more
        load_more_content(listings_div)
      end

      log "Found #{listing_urls.size} listings"
      listing_urls
    end

    def scrape_listing_details(url, listing, force: false)
      safe_goto(url)
      ScraperHelper.scrape_one(@browser, url, listing, force:)
    end

    def supports_complexes?
      true
    end

    def scrape_complex(url, listing_complex)
      safe_goto(url)

      name = @browser.h1.wait_until(timeout: 10, &:present?).text
      listing_complex.update(name:)

      # ... KW-specific complex scraping logic
    end

    private

    def load_more_content(listings_div)
      @browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', listings_div)

      if listings_div.button(text: 'Ver mais').present?
        listings_div.button(text: 'Ver mais').click
        log "Clicked 'Ver mais' button"
      end
    end
  end
end
```

#### 4. **Scraper Factory**
```ruby
# app/services/scraper_factory.rb
class ScraperFactory
  class UnsupportedPlatformError < StandardError; end

  ADAPTERS = {
    kw_portugal: Scrapers::KwPortugalAdapter,
    idealista: Scrapers::IdealistaAdapter,
    century21: Scrapers::Century21Adapter
    # Add more platforms here
  }.freeze

  def self.create(browser:, tenant:)
    platform = tenant.scraper_platform

    raise UnsupportedPlatformError, "No scraper_source_url set for tenant #{tenant.slug}" if platform.nil?
    raise UnsupportedPlatformError, "Unsupported platform: #{platform}" unless ADAPTERS.key?(platform)

    adapter_class = ADAPTERS[platform]
    adapter_class.new(browser:, tenant:)
  end
end
```

#### 5. **Refactored Scraper Service**
```ruby
# app/services/real_estate_scraper_service.rb
class RealEstateScraperService
  attr_reader :browser, :tenant, :adapter

  def initialize(tenant:, headless: true)
    @browser = ScraperHelper.setup_browser(headless:)
    @tenant = tenant
    @adapter = ScraperFactory.create(browser: @browser, tenant: @tenant)
  end

  def scrape_all
    log "Starting scrape_all for tenant: #{@tenant.slug}"

    listing_urls = @adapter.get_all_listing_urls
    queue_urls(listing_urls)

    log "Finished scrape_all for tenant: #{@tenant.slug}"
  end

  def scrape_one(url, listing = nil, force: false)
    listing ||= @tenant.listings.find_by(url:)

    log "Starting scrape_one for #{url}"
    @adapter.scrape_listing_details(url, listing, force:)
  end

  def scrape_complex(url, listing_complex = nil)
    raise "Platform doesn't support complexes" unless @adapter.supports_complexes?

    listing_complex ||= @tenant.listing_complexes.find_by(url:)
    @adapter.scrape_complex(url, listing_complex)
  end

  def rescrape(force: false)
    log "Rescraping all listings for tenant: #{@tenant.slug}"

    @tenant.listings.each do |listing|
      log "Queuing ScrapeUrlJob for #{listing.url}"
      ScrapeUrlJob.perform_later(@tenant.id, listing.url, force)
    end
  end

  def destroy
    @browser.quit
  end

  private

  def queue_urls(listing_urls)
    listing_urls.each_with_index do |url, index|
      log "Queuing ScrapeUrlJob for #{url}"

      wait_time = index * 2.minutes
      ScrapeUrlJob.set(wait: wait_time).perform_later(@tenant.id, url, false)
    end
  end

  def log(message)
    ScrapeListingDetails.log("[RealEstateScraperService] [Tenant: #{@tenant.slug}] #{message}")
  end
end
```

#### 6. **Updated Scraper Jobs**
```ruby
# app/sidekiq/scrape_all.rb
class ScrapeAll < ApplicationJob
  queue_as :bulk_scraping
  queue_with_priority 10

  def perform(tenant_id)
    tenant = Tenant.find(tenant_id)

    ActsAsTenant.with_tenant(tenant) do
      ScrapeListingDetails.log "[ScrapeAll] Starting for tenant: #{tenant.slug}"

      scraper_service = RealEstateScraperService.new(tenant: tenant)
      scraper_service.scrape_all

      FixDuplicatesJob.perform_later(tenant.id)

      ScrapeListingDetails.log "[ScrapeAll] DONE for tenant: #{tenant.slug}"
    ensure
      scraper_service&.destroy
    end
  end
end

# app/sidekiq/scrape_url_job.rb
class ScrapeUrlJob < ApplicationJob
  queue_as :individual_scraping
  queue_with_priority 5

  def perform(tenant_id, url, force = false)
    tenant = Tenant.find(tenant_id)

    ActsAsTenant.with_tenant(tenant) do
      ScrapeListingDetails.log "[ScrapeUrlJob] Starting #{url} for tenant: #{tenant.slug}"

      scraper_service = RealEstateScraperService.new(tenant: tenant)
      scraper_service.scrape_one(url, nil, force: force)

      ScrapeListingDetails.log "[ScrapeUrlJob] DONE for #{url}"
    ensure
      scraper_service&.destroy
    end
  end
end

# app/sidekiq/rescrape_job.rb
class RescrapeJob < ApplicationJob
  queue_as :bulk_scraping
  queue_with_priority 8

  def perform(tenant_id = nil)
    tenants = tenant_id ? [Tenant.find(tenant_id)] : Tenant.active.where.not(scraper_source_url: nil)

    tenants.each do |tenant|
      ScrapeListingDetails.log "[RescrapeJob] Starting rescrape for tenant: #{tenant.slug}"

      ActsAsTenant.with_tenant(tenant) do
        scraper_service = RealEstateScraperService.new(tenant: tenant)
        scraper_service.rescrape
      ensure
        scraper_service&.destroy
      end
    end
  end
end
```

---

## Implementation Plan

### Phase 1: Database & Models (30 minutes)

#### 1.1 Add scraper_source_url field
```bash
rails generate migration AddScraperSourceUrlToTenants scraper_source_url:string
rails db:migrate
```

#### 1.2 Update Tenant model
```ruby
# app/models/tenant.rb
class Tenant < ApplicationRecord
  validates :scraper_source_url,
            format: { with: URI::DEFAULT_PARSER.make_regexp },
            allow_blank: true

  def scraper_platform
    return nil if scraper_source_url.blank?

    uri = URI.parse(scraper_source_url)
    case uri.host
    when /kwportugal\.pt/ then :kw_portugal
    when /idealista\.pt/ then :idealista
    when /century21\.pt/ then :century21
    else :unknown
    end
  end
end
```

#### 1.3 Update existing tenant (Sofia Galvão)
```ruby
rails console

tenant = Tenant.find_by(slug: 'sofia-galvao')
tenant.update!(scraper_source_url: 'https://www.kwportugal.pt/pt/agente/Sofia-Galvao/34365')
```

### Phase 2: Adapter Architecture (2 hours)

#### 2.1 Create base adapter
```bash
mkdir -p app/services/scrapers
touch app/services/scrapers/base_adapter.rb
```
Copy the `BaseAdapter` class from above.

#### 2.2 Extract KW logic into adapter
```bash
touch app/services/scrapers/kw_portugal_adapter.rb
```
Move existing `RealEstateScraperService` logic into `KwPortugalAdapter`.

#### 2.3 Create scraper factory
```bash
touch app/services/scraper_factory.rb
```
Copy the `ScraperFactory` class from above.

### Phase 3: Refactor Core Service (1 hour)

#### 3.1 Refactor RealEstateScraperService
Replace entire contents of `app/services/real_estate_scraper_service.rb` with the refactored version above.

### Phase 4: Update Jobs (1 hour)

#### 4.1 Update ScrapeAll job
- Accept `tenant_id` parameter
- Set tenant context

#### 4.2 Update ScrapeUrlJob
- Accept `tenant_id` parameter
- Set tenant context

#### 4.3 Update RescrapeJob
- Loop through all active tenants
- Queue per-tenant jobs

#### 4.4 Update other scraper jobs
- `ForceRescrapeJob`
- `ScrapeComplexJob`

### Phase 5: Update Rake Tasks (30 minutes)

```ruby
# lib/tasks/scrape_all.rake
desc 'Run all scrapers for all tenants'
task scrape_all: :environment do
  tenants = Tenant.active.where.not(scraper_source_url: nil)

  puts "Starting scrape for #{tenants.count} tenants"

  tenants.each do |tenant|
    puts "Queueing ScrapeAll for tenant: #{tenant.slug}"
    ScrapeAll.perform_later(tenant.id)
  end

  puts 'All scrape jobs queued'
end

desc 'Run scraper for specific tenant'
task :scrape_tenant, [:tenant_slug] => :environment do |_t, args|
  tenant = Tenant.find_by!(slug: args[:tenant_slug])

  puts "Starting scrape for tenant: #{tenant.slug}"
  ScrapeAll.perform_later(tenant.id)
  puts 'Scrape job queued'
end
```

### Phase 6: API Updates (30 minutes)

#### 6.1 Update controllers
```ruby
# app/controllers/api/v1/super_admin/tenants_controller.rb
def tenant_params
  params.require(:tenant).permit(
    :name, :slug, :domain, :contact_email, :active,
    :agency_name, :website_url, :phone, :address,
    :scraper_source_url  # ✅ Add this
  )
end
```

#### 6.2 Update API responses
Add `scraper_source_url` to all tenant JSON responses.

### Phase 7: Frontend Updates (30 minutes)

#### 7.1 Update TypeScript interfaces
```typescript
interface Tenant {
  // ... existing fields
  scraper_source_url: string | null;
}
```

#### 7.2 Add form field
```tsx
<div className="mb-4">
  <Input
    type="url"
    label={t("super_admin.tenants.scraper_source_url")}
    value={scraperSourceUrl}
    onChange={(e) => setScraperSourceUrl(e.target.value)}
    placeholder="https://www.kwportugal.pt/pt/agente/Name/12345"
  />
  <p className="text-xs text-gray-500 mt-1">
    The URL where the scraper will find this agent's listings
  </p>
</div>
```

---

## Adding New Platforms

### Example: Idealista Portugal

#### 1. Create adapter class
```ruby
# app/services/scrapers/idealista_adapter.rb
module Scrapers
  class IdealistaAdapter < BaseAdapter
    def get_all_listing_urls
      safe_goto(base_url)
      accept_cookies

      # Idealista-specific selectors
      listings = @browser.divs(class: 'item-info-container')

      urls = listings.map do |listing|
        listing.a.href
      end.compact.uniq

      # Handle pagination if needed
      while next_page_exists?
        go_to_next_page
        new_listings = @browser.divs(class: 'item-info-container')
        urls += new_listings.map { |l| l.a.href }
      end

      log "Found #{urls.size} listings on Idealista"
      urls
    end

    def scrape_listing_details(url, listing, force: false)
      safe_goto(url)

      # Idealista-specific scraping logic
      title = @browser.h1(class: 'main-info__title').text
      price = @browser.span(class: 'info-data-price').text

      # ... more Idealista-specific extraction

      listing.update!(
        title: title,
        price: extract_price(price),
        # ... more fields
      )
    end

    def supports_complexes?
      false  # Idealista doesn't have "complexes"
    end

    private

    def next_page_exists?
      @browser.a(class: 'icon-arrow-right-after').present?
    end

    def go_to_next_page
      @browser.a(class: 'icon-arrow-right-after').click
      sleep 2
    end

    def extract_price(price_text)
      price_text.gsub(/[^\d]/, '').to_i
    end
  end
end
```

#### 2. Register in factory
```ruby
# app/services/scraper_factory.rb
ADAPTERS = {
  kw_portugal: Scrapers::KwPortugalAdapter,
  idealista: Scrapers::IdealistaAdapter,  # ✅ Add this
  century21: Scrapers::Century21Adapter
}.freeze
```

#### 3. Update tenant platform detection
```ruby
# app/models/tenant.rb
def scraper_platform
  return nil if scraper_source_url.blank?

  uri = URI.parse(scraper_source_url)
  case uri.host
  when /kwportugal\.pt/ then :kw_portugal
  when /idealista\.pt/ then :idealista  # ✅ Add this
  when /century21\.pt/ then :century21
  else :unknown
  end
end
```

#### 4. Test with a tenant
```ruby
rails console

tenant = Tenant.create!(
  name: "Test Idealista Agent",
  slug: "test-idealista",
  scraper_source_url: "https://www.idealista.pt/pro/agentes/123456"
)

# Test scraping
scraper = RealEstateScraperService.new(tenant: tenant)
scraper.scrape_all
```

---

## Migration Guide

### For Existing Sofia Galvão Installation

#### 1. Backup database
```bash
pg_dump real_estate_scraper_production > backup.sql
```

#### 2. Run migrations
```bash
rails db:migrate
```

#### 3. Update Sofia Galvão tenant
```ruby
tenant = Tenant.find_by(slug: 'sofia-galvao')
tenant.update!(scraper_source_url: 'https://www.kwportugal.pt/pt/agente/Sofia-Galvao/34365')
```

#### 4. Update Sidekiq scheduled jobs
If you have scheduled scraping jobs:
```ruby
# config/sidekiq.yml or wherever you schedule jobs
# OLD:
# ScrapeAll.perform_later

# NEW:
tenant = Tenant.find_by(slug: 'sofia-galvao')
ScrapeAll.perform_later(tenant.id)
```

#### 5. Update rake task invocations
```bash
# OLD:
rake scrape_all

# NEW:
rake scrape_all  # Runs for all tenants now
# OR for specific tenant:
rake scrape_tenant[sofia-galvao]
```

---

## Testing Strategy

### Unit Tests

#### Test Base Adapter
```ruby
# test/services/scrapers/base_adapter_test.rb
require 'test_helper'

class Scrapers::BaseAdapterTest < ActiveSupport::TestCase
  setup do
    @browser = mock('browser')
    @tenant = tenants(:sofia_galvao)
    @adapter = Scrapers::BaseAdapter.new(browser: @browser, tenant: @tenant)
  end

  test "raises NotImplementedError for abstract methods" do
    assert_raises(NotImplementedError) { @adapter.get_all_listing_urls }
    assert_raises(NotImplementedError) { @adapter.scrape_listing_details('url', nil) }
  end
end
```

#### Test KW Adapter
```ruby
# test/services/scrapers/kw_portugal_adapter_test.rb
require 'test_helper'

class Scrapers::KwPortugalAdapterTest < ActiveSupport::TestCase
  setup do
    @tenant = tenants(:sofia_galvao)
    @tenant.update!(scraper_source_url: 'https://www.kwportugal.pt/pt/agente/Sofia-Galvao/34365')

    # Use real browser for integration testing
    @scraper = RealEstateScraperService.new(tenant: @tenant, headless: true)
  end

  teardown do
    @scraper&.destroy
  end

  test "extracts listing URLs from KW page" do
    urls = @scraper.adapter.get_all_listing_urls

    assert urls.is_a?(Array)
    assert urls.all? { |url| url.include?('/imovel/') }
    assert urls.size > 0
  end

  test "scrapes individual listing details" do
    url = 'https://www.kwportugal.pt/pt/imovel/example-123'
    listing = Listing.create!(tenant: @tenant, url: url)

    @scraper.adapter.scrape_listing_details(url, listing)

    listing.reload
    assert_not_nil listing.title
    assert_not_nil listing.price
  end
end
```

#### Test Scraper Factory
```ruby
# test/services/scraper_factory_test.rb
require 'test_helper'

class ScraperFactoryTest < ActiveSupport::TestCase
  test "creates KW adapter for KW URL" do
    tenant = tenants(:sofia_galvao)
    tenant.update!(scraper_source_url: 'https://www.kwportugal.pt/pt/agente/Name/123')

    browser = mock('browser')
    adapter = ScraperFactory.create(browser: browser, tenant: tenant)

    assert_instance_of Scrapers::KwPortugalAdapter, adapter
  end

  test "raises error for unsupported platform" do
    tenant = tenants(:sofia_galvao)
    tenant.update!(scraper_source_url: 'https://unsupported-platform.com')

    browser = mock('browser')

    assert_raises(ScraperFactory::UnsupportedPlatformError) do
      ScraperFactory.create(browser: browser, tenant: tenant)
    end
  end

  test "raises error when scraper_source_url is nil" do
    tenant = tenants(:sofia_galvao)
    tenant.update!(scraper_source_url: nil)

    browser = mock('browser')

    assert_raises(ScraperFactory::UnsupportedPlatformError) do
      ScraperFactory.create(browser: browser, tenant: tenant)
    end
  end
end
```

### Integration Tests

```ruby
# test/integration/multi_tenant_scraping_test.rb
require 'test_helper'

class MultiTenantScrapingTest < ActionDispatch::IntegrationTest
  test "scrapes listings for multiple tenants concurrently" do
    tenant1 = Tenant.create!(
      name: "Agent 1",
      slug: "agent-1",
      scraper_source_url: "https://www.kwportugal.pt/pt/agente/Agent1/111"
    )

    tenant2 = Tenant.create!(
      name: "Agent 2",
      slug: "agent-2",
      scraper_source_url: "https://www.kwportugal.pt/pt/agente/Agent2/222"
    )

    # Queue scraping jobs
    ScrapeAll.perform_later(tenant1.id)
    ScrapeAll.perform_later(tenant2.id)

    # Process jobs
    perform_enqueued_jobs

    # Verify listings are isolated
    assert tenant1.listings.count > 0
    assert tenant2.listings.count > 0
    assert_equal 0, tenant1.listings.where(tenant: tenant2).count
  end
end
```

---

## Performance Considerations

### 1. Rate Limiting
Implement per-tenant rate limiting to avoid getting blocked:

```ruby
# app/services/scrapers/base_adapter.rb
class BaseAdapter
  REQUESTS_PER_MINUTE = 30

  def rate_limited_request
    # Use Redis to track request counts
    key = "scraper:#{@tenant.id}:requests:#{Time.current.to_i / 60}"
    count = Redis.current.incr(key)
    Redis.current.expire(key, 60)

    if count > REQUESTS_PER_MINUTE
      sleep_time = 60 - (Time.current.to_i % 60)
      log "Rate limit reached, sleeping for #{sleep_time} seconds"
      sleep(sleep_time)
    end

    yield
  end
end
```

### 2. Parallel Processing
Use Sidekiq's concurrency for multi-tenant scraping:

```yaml
# config/sidekiq.yml
:concurrency: 5
:queues:
  - [bulk_scraping, 2]      # Lower weight for bulk operations
  - [individual_scraping, 5] # Higher weight for individual listings
```

### 3. Browser Pool
Reuse browser instances per worker:

```ruby
# app/services/browser_pool.rb
class BrowserPool
  POOL_SIZE = 3

  def self.checkout
    # Implement connection pooling for browsers
  end

  def self.checkin(browser)
    # Return browser to pool
  end
end
```

---

## Monitoring & Logging

### Add structured logging
```ruby
# app/services/scrapers/base_adapter.rb
def log(message, level: :info, **metadata)
  log_data = {
    adapter: self.class.name,
    tenant_id: @tenant.id,
    tenant_slug: @tenant.slug,
    platform: @tenant.scraper_platform,
    message: message
  }.merge(metadata)

  Rails.logger.public_send(level, log_data.to_json)
end
```

### Add metrics tracking
```ruby
# app/services/scrapers/base_adapter.rb
def track_scrape_duration
  start_time = Time.current
  result = yield
  duration = Time.current - start_time

  # Send to monitoring service (StatsD, Datadog, etc.)
  StatsD.histogram("scraper.duration", duration,
    tags: ["platform:#{@tenant.scraper_platform}", "tenant:#{@tenant.slug}"])

  result
end
```

---

## Security Considerations

### 1. Validate URLs
```ruby
# app/models/tenant.rb
validate :scraper_source_url_is_safe

def scraper_source_url_is_safe
  return if scraper_source_url.blank?

  uri = URI.parse(scraper_source_url)

  # Only allow HTTPS
  if uri.scheme != 'https'
    errors.add(:scraper_source_url, 'must use HTTPS')
  end

  # Whitelist domains
  allowed_domains = ['kwportugal.pt', 'idealista.pt', 'century21.pt']
  unless allowed_domains.any? { |domain| uri.host.end_with?(domain) }
    errors.add(:scraper_source_url, 'domain not allowed')
  end
rescue URI::InvalidURIError
  errors.add(:scraper_source_url, 'is not a valid URL')
end
```

### 2. Sandbox Scraping
Run scrapers in isolated environments with resource limits.

---

## Rollback Plan

If issues arise:

### 1. Disable new scraper
```ruby
# config/initializers/feature_flags.rb
FeatureFlags.define(:multi_tenant_scraper, default: false)

# In code
if FeatureFlags.enabled?(:multi_tenant_scraper)
  # Use new scraper
else
  # Use old scraper
end
```

### 2. Revert migration
```bash
rails db:rollback
```

### 3. Restore from backup
```bash
psql real_estate_scraper_production < backup.sql
```

---

## Success Criteria

The refactor is complete when:

- ✅ Sofia Galvão's existing scraper continues working
- ✅ Can create new tenant with different KW agent URL
- ✅ Both tenants scrape independently without interference
- ✅ Listings are properly isolated by tenant
- ✅ Can add new Idealista adapter and test
- ✅ All tests pass
- ✅ Performance is equal or better than before
- ✅ Monitoring and logging in place

---

## Future Enhancements

1. **AI-Powered Selector Detection**: Use machine learning to automatically detect listing selectors on new platforms
2. **Scraper Marketplace**: Allow users to contribute and share adapters for different platforms
3. **Real-time Scraping**: Use webhooks or push notifications instead of polling
4. **Intelligent Deduplication**: Detect same property across different platforms
5. **Price History Tracking**: Store historical pricing data for analysis

---

## Questions & Support

For questions about this refactor:
- Create an issue in the GitHub repository
- Contact the development team
- Review the adapter examples in `app/services/scrapers/`

## Related Documentation

- [Multi-Tenancy Architecture](./MULTI_TENANCY.md)
- [Scraper Helper Documentation](./lib/scraper_helper.rb)
- [Sidekiq Job Configuration](./config/sidekiq.yml)
