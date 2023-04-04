# frozen_string_literal: true

desc 'Update slugs to use friendly_id'
task update_slugs: :environment do
  BlogPost.find_each(&:save)
  Listing.find_each(&:save)
  ListingComplex.find_each(&:save)
end
