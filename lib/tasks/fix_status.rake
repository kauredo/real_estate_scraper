# frozen_string_literal: true

desc 'Change status no enum'
task fix_status: :environment do
  listings = Listing.all
  listings.each do |listing|
    listing.status = case listing.old_status
                     when 'Novo' then 0
                     when 'Reservado' then 2
                     when 'Vendido' then 3
                     else 1
                     end
    listing.save
  end
end

desc 'make listing_complex work with localization'
task fix_complex: :environment do
  ListingComplex.all.each do |lc|
    name_was = lc.name_was
    description_was = lc.description_was
    lc.name_pt = name_was
    lc.description_en = description_was
    lc.description_pt = description_was
    lc.name_en = name_was
    lc.save
  end
end
