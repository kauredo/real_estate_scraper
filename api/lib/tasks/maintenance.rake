# frozen_string_literal: true

# ==============================================================================
# Maintenance Tasks - Recurring cleanup operations
# ==============================================================================

namespace :listings do
  # Helper method for fixing duplicates by URL only
  def fix_duplicates_by_url
    # Find all URLs that have more than one listing
    duplicate_urls = Listing.unscoped.group(:url).having('count(*) > 1').pluck(:url)
    if duplicate_urls.empty?
      puts 'No duplicate URLs found'
      return
    end

    duplicate_urls.each do |url|
      listings = Listing.unscoped.includes(:translations).where(url:)
      next if listings.length <= 1

      listings.each do |listing|
        # Check if all translations have blank or nil description
        has_content = listing.translations.any? { |t| t.description.present? }
        unless has_content
          listing.destroy
          puts "Deleted listing ##{listing.id} for URL #{url} (no description in any language)"
        end
      end
    end
  end

  desc 'Fix duplicate listings by URL and remove listings with no description in any language'
  task fix_duplicates: :environment do
    fix_duplicates_by_url

    # Optionally, clean up soft-deleted listings with duplicate URLs
    duplicate_urls = Listing.unscoped.group(:url).having('count(*) > 1').pluck(:url)
    duplicates = Listing.unscoped.where(url: duplicate_urls)
    duplicates.each do |listing|
      listing.destroy_fully! if listing.deleted_at.present? && (Listing.where(url: listing.url).present? || Listing.unscoped.where(url: listing.url).count > 1)
    end
  end
end

desc 'Delete old listings with status vendido'
task delete_old_sold: :environment do
  puts 'Before: '
  print Listing.where.not(status_changed_at: nil).count
  puts ''

  Listing.where.not(status_changed_at: nil).each do |listing|
    listing.destroy if listing.status_changed_at <= 6.months.ago && listing.sold?
  end

  puts 'After: '
  print Listing.where.not(status_changed_at: nil).count
  puts ''
end
