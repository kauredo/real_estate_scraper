# frozen_string_literal: true

require 'selenium-webdriver'

desc 'Scrape listings off KW website'
task :scrape, [:tenant_slug] => :environment do |_t, args|
  tenant_slug = args[:tenant_slug] || 'sgg' # Default to Sofia Galvão for backward compatibility
  tenant = Tenant.find_by!(slug: tenant_slug)

  puts "Starting scrape for tenant: #{tenant.slug}"

  scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.scrape_all
  scraper_service.destroy

  puts "Scrape complete for tenant: #{tenant.slug}"
end

desc 'Re-scrape listings off KW website'
task :rescrape, [:tenant_slug] => :environment do |_t, args|
  tenant_slug = args[:tenant_slug] || 'sgg'
  tenant = Tenant.find_by!(slug: tenant_slug)

  puts "Starting rescrape for tenant: #{tenant.slug}"

  scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.rescrape
  scraper_service.destroy

  puts "Rescrape complete for tenant: #{tenant.slug}"
end

desc 'Force re-scrape listings off KW website'
task :force_rescrape, [:tenant_slug] => :environment do |_t, args|
  tenant_slug = args[:tenant_slug] || 'sgg'
  tenant = Tenant.find_by!(slug: tenant_slug)

  puts "Starting force rescrape for tenant: #{tenant.slug}"

  scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.rescrape(force: true)
  scraper_service.destroy

  puts "Force rescrape complete for tenant: #{tenant.slug}"
end

desc 'Scrape one listing off KW website'
task :scrape_one, [:tenant_slug, :url, :force] => :environment do |_t, arguments|
  tenant_slug = arguments.tenant_slug || 'sgg'
  url = arguments.url
  force = arguments.force.to_s == 'true'

  unless url
    puts 'Error: URL is required'
    puts 'Usage: rake scrape_one[tenant_slug,url,force]'
    exit 1
  end

  tenant = Tenant.find_by!(slug: tenant_slug)

  puts "Starting scrape_one for #{url} (tenant: #{tenant.slug}, force: #{force})"

  scraper_service = RealEstateScraperService.new(tenant:, headless: ENV.fetch('HEADFULL', '').blank?)
  scraper_service.scrape_one(url, nil, force:)
  scraper_service.destroy

  puts "Scrape complete for #{url}"
end
