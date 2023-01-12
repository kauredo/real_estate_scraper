# frozen_string_literal: true

desc 'Change status no enum'
task fix_status: :environment do
  listings = Listing.all
  listings.each do |listing|
    listing.status = case listing.old_status
    when "Novo" then 0
    when "Reservado" then 2
    when "Vendido" then 3
    else 1
    end
    listing.save
  end
end
