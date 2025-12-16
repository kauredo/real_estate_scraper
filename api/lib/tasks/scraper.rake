# frozen_string_literal: true

require 'selenium-webdriver'

namespace :scraper do
  # ==============================================================================
  # Single Tenant Scraping (run in foreground with browser)
  # ==============================================================================

  desc 'Scrape listings for a tenant (foreground)'
  task :run, [:tenant_slug] => :environment do |_t, args|
    tenant_slug = args[:tenant_slug] || 'sgg' # Default to Sofia Galvão for backward compatibility
    tenant = Tenant.find_by!(slug: tenant_slug)

    puts "Starting scrape for tenant: #{tenant.slug}"

    scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
    scraper_service.scrape_all
    scraper_service.destroy

    puts "Scrape complete for tenant: #{tenant.slug}"
  end

  desc 'Re-scrape existing listings for a tenant (foreground)'
  task :rescrape, [:tenant_slug] => :environment do |_t, args|
    tenant_slug = args[:tenant_slug] || 'sgg'
    tenant = Tenant.find_by!(slug: tenant_slug)

    puts "Starting rescrape for tenant: #{tenant.slug}"

    scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
    scraper_service.rescrape
    scraper_service.destroy

    puts "Rescrape complete for tenant: #{tenant.slug}"
  end

  desc 'Force re-scrape all listings for a tenant (foreground)'
  task :force_rescrape, [:tenant_slug] => :environment do |_t, args|
    tenant_slug = args[:tenant_slug] || 'sgg'
    tenant = Tenant.find_by!(slug: tenant_slug)

    puts "Starting force rescrape for tenant: #{tenant.slug}"

    scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
    scraper_service.rescrape(force: true)
    scraper_service.destroy

    puts "Force rescrape complete for tenant: #{tenant.slug}"
  end

  desc 'Scrape one specific listing (foreground)'
  task :one, %i[tenant_slug url force] => :environment do |_t, arguments|
    tenant_slug = arguments.tenant_slug || 'sgg'
    url = arguments.url
    force = arguments.force.to_s == 'true'

    unless url
      puts 'Error: URL is required'
      puts 'Usage: rake scraper:one[tenant_slug,url,force]'
      exit 1
    end

    tenant = Tenant.find_by!(slug: tenant_slug)

    puts "Starting scrape for #{url} (tenant: #{tenant.slug}, force: #{force})"

    scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
    scraper_service.scrape_one(url, nil, force:)
    scraper_service.destroy

    puts "Scrape complete for #{url}"
  end

  desc 'Scrape one specific complex (foreground)'
  task :complex, %i[tenant_slug url] => :environment do |_t, arguments|
    tenant_slug = arguments.tenant_slug || 'sgg'
    url = arguments.url

    unless url
      puts 'Error: URL is required'
      puts 'Usage: rake scraper:complex[tenant_slug,url]'
      exit 1
    end

    tenant = Tenant.find_by!(slug: tenant_slug)

    puts "Starting complex scrape for #{url} (tenant: #{tenant.slug})"

    scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
    scraper_service.scrape_complex(url, nil)
    scraper_service.destroy

    puts "Complex scrape complete for #{url}"
  end

  # ==============================================================================
  # Multi-Tenant Scraping (queue background jobs)
  # ==============================================================================

  desc 'Run scrapers for all active tenants (background jobs)'
  task all: :environment do
    tenants = Tenant.active.where.not(scraper_source_url: nil)

    puts "Starting scrape for #{tenants.count} tenants"

    tenants.each do |tenant|
      puts "Queueing ScrapeAll for tenant: #{tenant.slug}"
      ScrapeAll.perform_later(tenant.id)
    end

    puts 'All scrape jobs queued'
  end

  desc 'Run scraper for specific tenant (background job)'
  task :tenant, [:tenant_slug] => :environment do |_t, args|
    unless args[:tenant_slug]
      puts 'Error: tenant_slug is required'
      puts 'Usage: rake scraper:tenant[sofia-galvao]'
      exit 1
    end

    tenant = Tenant.find_by!(slug: args[:tenant_slug])

    puts "Queueing scrape job for tenant: #{tenant.slug}"
    ScrapeAll.perform_later(tenant.id)
    puts 'Scrape job queued'
  end
end
