desc "Update m2 to m²"
task update_m2: :environment do
  Listing.all.each do |listing|
    listing.title&.gsub! 'm2', 'm²'
    listing.description&.gsub! 'm2', 'm²'
    listing.stats["Área Útil"]&.gsub! 'm 2', 'm²'
    listing.stats["Área Bruta (CP)"]&.gsub! 'm 2', 'm²'
    listing.stats["Área do Terreno"]&.gsub! 'm 2', 'm²'

    listing.save
  end
end
