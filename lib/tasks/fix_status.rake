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
