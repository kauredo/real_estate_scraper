# frozen_string_literal: true

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
  unless args[:tenant_slug]
    puts 'Error: tenant_slug is required'
    puts 'Usage: rake scrape_tenant[sofia-galvao]'
    exit 1
  end

  tenant = Tenant.find_by!(slug: args[:tenant_slug])

  puts "Starting scrape for tenant: #{tenant.slug}"
  ScrapeAll.perform_later(tenant.id)
  puts 'Scrape job queued'
end
