# frozen_string_literal: true

desc 'Delete old listings with status vendido'
task delete_old_sold: :environment do
  puts 'Before: '
  print Listing.where.not(status_changed_at: nil).count
  puts ''

  Listing.where.not(status_changed_at: nil).each do |listing|
    listing.destroy if listing.status_changed_at <= 6.months.ago
  end

  puts 'After: '
  print Listing.where.not(status_changed_at: nil).count
  puts ''
end
