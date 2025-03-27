# frozen_string_literal: true

require 'faker'

ENV['USE_LOCAL_STORAGE'] = 'true'
ENV['DISABLE_CLOUDINARY'] = 'true'

puts 'Cleaning up temp storage...'
FileUtils.rm_rf(Rails.root.join('tmp', 'storage'))
FileUtils.mkdir_p(Rails.root.join('tmp', 'storage'))
# add .keep file to prevent git from deleting the folder
FileUtils.touch(Rails.root.join('tmp', 'storage', '.keep'))

puts 'Cleaning up database...'
[Variable, Testimonial, ClubStory, ClubStoryPhoto, BlogPost, BlogPhoto, ListingComplex, Listing, Photo, User, NewsletterSubscription].each do |model|
  model.destroy_all
  puts "Cleaned #{model.name}"
end

# Download images locally instead of using remote_image_url
def download_image(file_name, index)
  file_path = Rails.root.join('tmp', 'storage', "#{file_name}.jpg")
  FileUtils.mkdir_p(File.dirname(file_path))

  unless File.exist?(file_path)
    random = Faker::Number.number(digits: 6) + index
    # Added -L flag to follow redirects
    command = "curl -L -s -f -o #{file_path} 'https://picsum.photos/800/600?random=#{random}'"
    success = system(command)
    raise "Failed to download image #{index}" unless success && File.size?(file_path).to_i > 0
  end

  File.open(file_path)
rescue => e
  puts "\nError downloading image #{index}: #{e.message}"
  nil
end

# Create Listing Complexes with translations and photos
puts 'Creating listing complexes...'
8.times do |i|
  complex = ListingComplex.create!(
    name: Faker::Address.community,
    description: Faker::Lorem.paragraphs(number: 2).join("\n\n"),
    video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}",
    order: i + 1,
    subtext: Faker::Lorem.paragraph,
    final_text: Faker::Lorem.paragraph,
    new_format: [true, false].sample,
    hidden: [true, false].sample,
    url: Faker::Internet.url
  )

  I18n.with_locale(:en) do
    complex.name = Faker::Address.community
    complex.description = Faker::Lorem.paragraphs(number: 2).join("\n\n")
    complex.subtext = Faker::Lorem.paragraph
    complex.final_text = Faker::Lorem.paragraph
    complex.save!
  end

  # Add photos to complex
  5.times do |j|
    Photo.create!(
      listing_complex: complex,
      image: download_image("#{complex.id}#{j}", j),
      main: j.zero?,
      order: j + 1
    )
  end

  # Create Listings for each complex
  rand(3..8).times do |j|
    listing = Listing.new(
      listing_complex: complex,
      stats: {
        bedrooms: rand(1..6),
        bathrooms: rand(1..4),
        parking: rand(0..3),
        area: rand(50..500)
      },
      address: Faker::Address.full_address,
      features: Faker::Lorem.words(number: rand(3..8)),
      title: Faker::Lorem.sentence,
      url: Faker::Internet.url,
      description: Faker::Lorem.paragraphs(number: 3).join("\n\n"),
      photos: Array.new(rand(5..10)) { "https://picsum.photos/800/600?random=#{Faker::Number.number(digits: 6)}" },
      order: j + 1,
      status: Listing.statuses.keys.sample,
      video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}",
      price_cents: rand(100_000..5_000_000) * 100,
      kind: Listing.kinds.keys.sample,
      objective: Listing.objectives.keys.sample,
      virtual_tour_url: Faker::Internet.url
    )

    I18n.with_locale(:en) do
      listing.title = Faker::Lorem.sentence
      listing.description = Faker::Lorem.paragraphs(number: 3).join("\n\n")
      listing.features = Faker::Lorem.words(number: rand(3..8))
      listing.save!(validate: false)
    end
  end
end

# Create Variables with translations
puts 'Creating variables...'
10.times do
  variable = Variable.create!(
    name: Faker::Company.buzzword,
    value: [Faker::Number.number(digits: 6), Faker::Company.bs].sample,
    icon: ['fas fa-medal', 'fas fa-trophy', 'fas fa-star', 'fas fa-award', 'fas fa-certificate'].sample
  )

  I18n.available_locales.each do |locale|
    next if locale == :pt
    I18n.with_locale(locale) do
      variable.name = Faker::Company.buzzword
      variable.value = [Faker::Number.number(digits: 6), Faker::Company.bs].sample
      variable.save!
    end
  end
end

# Create Testimonials with translations
puts 'Creating testimonials...'
20.times do
  testimonial = Testimonial.create!(
    name: Faker::Name.name,
    text: Faker::Lorem.paragraph(sentence_count: 3)
  )

  I18n.with_locale(:en) do
    testimonial.text = Faker::Lorem.paragraph(sentence_count: 3)
    testimonial.save!
  end
end

# Create Club Stories with translations and photos
puts 'Creating club stories...'
15.times do
  story = ClubStory.create!(
    title: Faker::Company.catch_phrase,
    text: "<p>#{Faker::Lorem.paragraphs(number: 3).join('</p><p>')}</p>",
    hidden: [true, false].sample,
    meta_title: Faker::Marketing.buzzwords,
    meta_description: Faker::Company.catch_phrase,
    video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}"
  )

  I18n.with_locale(:en) do
    story.title = Faker::Company.catch_phrase
    story.text = "<p>#{Faker::Lorem.paragraphs(number: 3).join('</p><p>')}</p>"
    story.save!
  end

  # Add photos to story
  puts "  Adding photos to story #{story.id}..."
  3.times do |i|
    image = download_image("story_#{story.id}_#{i}", i)
    if image
      ClubStoryPhoto.create!(
        club_story: story,
        image: image,
        main: i.zero?
      )
      puts "."
    else
      puts "x"
    end
  end
  puts " done!"
end

# Create Admin user
puts 'Creating admin user...'
Admin.create!(
  email: 'admin@example.com',
  password: 'password123',
  confirmed: true
)

# Create regular users with newsletter subscriptions
puts 'Creating users and newsletter subscriptions...'
20.times do
  user = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
    confirmed_email: [true, false].sample
  )

  # 70% chance of having newsletter subscription
  if rand < 0.7
    NewsletterSubscription.create!(user: user)
  end
end

puts 'Seed completed successfully! 🎉'
