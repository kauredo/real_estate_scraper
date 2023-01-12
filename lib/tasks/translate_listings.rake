# frozen_string_literal: true

desc 'Defaults all listings to PT'
task translate_listings: :environment do
  listings = Listing.all
  Mobility.with_locale(:pt) do
    listings.each do |listing|
      listing.title = listing.title_was
      listing.description = listing.description_was
      listing.status = listing.status_was
      listing.save
    end
  end
end
