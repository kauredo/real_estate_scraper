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

desc 'make variables work with localization'
task fix_variables: :environment do
  Variable.all.each do |var|
    name_was = var.name_was
    value_was = var.value_was
    var.name_pt = name_was
    var.value_en = value_was
    var.value_pt = value_was
    var.name_en = name_was
    var.save
  end
end

desc 'make testimonials work with localization'
task fix_testimonials: :environment do
  Testimonial.all.each do |test|
    text_was = test.text_was
    test.text_pt = text_was
    test.text_en = text_was
    test.save
  end
end

desc 'fix duplicate listings'
task fix_duplicates: :environment do
  # Assuming you're interested in Portuguese translations
  portuguese_listings = Listing.unscoped.includes(:translations).where(translations: { locale: 'pt' })
  english_listings = Listing.unscoped.includes(:translations).where(translations: { locale: 'en' })

  def fix_duplicates(language_listings)
    # Group by translated title and count occurrences
    grouped_listings = language_listings.group('translations.title').count

    # Convert grouped hash to array of [title, count] pairs
    titles_and_counts = grouped_listings.map { |title, count| [title, count] }

    # Fetch the actual listings for each title
    listings_by_title = {}
    titles_and_counts.each do |title, _count|
      listings_for_title = language_listings.joins(:translations).where(translations: { title: }).to_a
      listings_by_title[title] = listings_for_title if listings_for_title.length > 1 && title.present?
    end

    # For each title with more than one listing, keep the first one and destroy the rest
    listings_by_title.each do |title, listings|
      next if listings.length <= 1 || title.nil? || title.empty?

      main = listings.detect { |listing| listing.url.downcase.exclude?('/imovel/') || !listing.order.nil? || true }
      others = listings - [main]

      main.url = others.first.url
      others.each(&:destroy)
      main.save

      puts "Deleted #{others.length} listings for #{title}"
    end
  end

  I18n.with_locale(:pt) do
    puts 'Fixing duplicates for Portuguese listings'
    fix_duplicates(portuguese_listings)
  end

  I18n.with_locale(:en) do
    puts 'Fixing duplicates for English listings'
    fix_duplicates(english_listings)
  end
end
