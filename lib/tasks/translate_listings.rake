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
  # Mobility.with_locale(:en) do
  #   listings.each do |listing|
  #     listing.title = nil
  #     listing.description = nil
  #     listing.status = nil
  #     listing.save
  #   end
  # end
end
