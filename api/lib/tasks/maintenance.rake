# frozen_string_literal: true

# ==============================================================================
# Maintenance Tasks - Recurring cleanup operations
# ==============================================================================

namespace :listings do
  # Helper method for fixing duplicates
  def fix_duplicates(language_listings)
    # Group by translated title and another attribute (e.g., url) and count occurrences
    grouped_listings = language_listings.group('translations.title', 'listings.url').count

    # Convert grouped hash to array of [title, url, count] pairs
    titles_urls_and_counts = grouped_listings.map { |(title, url), count| [title, url, count] }

    # Fetch the actual listings for each title and url
    listings_by_title_and_url = {}
    titles_urls_and_counts.each do |title, url, _count|
      listings_for_title_and_url = language_listings.joins(:translations).where(translations: { title: }, url:).to_a
      listings_by_title_and_url[[title, url]] = listings_for_title_and_url if listings_for_title_and_url.length > 1 && title.present?
    end

    if listings_by_title_and_url.empty?
      puts 'No duplicates found'
      return
    end

    # For each title and url with more than one listing, keep the first one and destroy the rest
    listings_by_title_and_url.each do |(title, url), listings|
      next if listings.length <= 1 || title.nil? || title.empty?

      main = listings.detect { |listing| listing.url.downcase.exclude?('/imovel/') || !listing.order.nil? || true }
      others = listings - [main]

      main.url = others.first.url
      others.each(&:destroy)
      main.save

      puts "Deleted #{others.length} listings for #{title} with URL #{url}"
    end
  end

  desc 'Fix duplicate listings'
  task fix_duplicates: :environment do
    # Assuming you're interested in Portuguese translations
    portuguese_listings = Listing.unscoped.includes(:translations).where(translations: { locale: 'pt' })
    english_listings = Listing.unscoped.includes(:translations).where(translations: { locale: 'en' })

    I18n.with_locale(:pt) do
      puts 'Fixing duplicates for Portuguese listings'
      fix_duplicates(portuguese_listings)
    end

    I18n.with_locale(:en) do
      puts 'Fixing duplicates for English listings'
      fix_duplicates(english_listings)
    end

    duplicate_urls = Listing.unscoped.map(&:url).tally.select { |_, count| count > 1 }.keys
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
