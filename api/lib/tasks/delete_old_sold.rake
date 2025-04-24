# frozen_string_literal: true

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

desc 'Delete duplicated listings with same url'
task delete_duplicated_listings: :environment do
  puts "Before: #{Listing.count}"

  # For each URL that appears more than once…
  Listing.unscoped.group(:url).having('count(*) > 1').distinct.pluck(:url).each do |url|
    listings = Listing.unscoped.where(url:)

    # Look for a listing that does not have a generic title
    non_generic = listings.detect { |l| l.title !~ /\AImóvel \d+ - / }

    # If one exists, keep that one; otherwise, keep the last one in the group.
    listing_to_keep = non_generic || listings.order(:updated_at).last

    # Delete all other listings for this URL
    listings.where.not(id: listing_to_keep.id).each(&:destroy_fully!)
  end

  puts "After: #{Listing.count}"
end
