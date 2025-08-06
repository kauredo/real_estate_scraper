# frozen_string_literal: true

require 'faker'

ENV['USE_LOCAL_STORAGE'] = 'true'
ENV['DISABLE_CLOUDINARY'] = 'true'

puts "\n=== Starting seed process ==="
start_time = Time.current
puts "#{Time.current} - Cleaning up temp storage..."
FileUtils.rm_rf(Rails.root.join('tmp', 'storage'))
FileUtils.mkdir_p(Rails.root.join('tmp', 'storage'))
# add .keep file to prevent git from deleting the folder
FileUtils.touch(Rails.root.join('tmp', 'storage', '.keep'))

puts "\n#{Time.current} - Cleaning up database..."
[Variable, Testimonial, ClubStory, ClubStoryPhoto, BlogPost, BlogPhoto, ListingComplex, Listing, Photo, User, NewsletterSubscription, ClubUser].each do |model|
  print "  • Cleaning #{model.name}... "
  count = model.count
  model.destroy_all
  puts "#{count} records removed"
end

# Download images locally instead of using remote_image_url
def download_image(file_name, index)
  file_path = Rails.root.join('tmp', 'storage', "#{file_name}.jpg")
  FileUtils.mkdir_p(File.dirname(file_path))

  unless File.exist?(file_path)
    # Try different image services
    urls = [
      "https://picsum.photos/800/600?random=#{Faker::Number.number(digits: 6) + index}",
      "https://source.unsplash.com/800x600/?random&sig=#{index}",
      "https://loremflickr.com/800/600/house?random=#{index}"
    ]

    urls.each do |url|
      command = "curl -L -s -f --connect-timeout 5 --max-time 15 -o #{file_path} '#{url}'"
      if system(command) && File.size?(file_path)&.positive?
        break
      else
        puts "\n    Failed to download from #{url}, trying next..."
      end
    end

    # Create dummy if all failed
    unless File.size?(file_path)&.positive?
      File.write(file_path, "dummy image content for #{file_name}")
    end
  end

  File.open(file_path)
rescue => e
  puts "\nError downloading image #{index}: #{e.message}"
  File.write(file_path, "dummy image content for #{file_name}")
  File.open(file_path)
end

# Helper method to create content with locales
def with_locales
  Faker::Config.locale = 'pt'
  pt_content = yield(:pt)

  Faker::Config.locale = 'en'
  en_content = yield(:en)

  { pt: pt_content, en: en_content }
end

puts "\n#{Time.current} - Creating listing complexes..."
8.times do |i|
  print "  • Complex #{i + 1}/8: "
  content = with_locales do |_locale|
    {
      name: Faker::Address.community,
      description: Faker::Lorem.paragraphs(number: 2).join("\n\n"),
      subtext: Faker::Lorem.paragraph,
      final_text: Faker::Lorem.paragraph
    }
  end

  print "Creating base record... "
  complex = ListingComplex.create!(
    name: content[:pt][:name],
    description: content[:pt][:description],
    subtext: content[:pt][:subtext],
    final_text: content[:pt][:final_text],
    video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}",
    order: i + 1,
    new_format: [true, false].sample,
    hidden: [true, false].sample,
    url: Faker::Internet.url
  )
  print "✓ "

  print "Adding English translation... "
  I18n.with_locale(:en) do
    complex.name = content[:en][:name]
    complex.description = content[:en][:description]
    complex.subtext = content[:en][:subtext]
    complex.final_text = content[:en][:final_text]
    complex.save!
  end
  print "✓ "

  print "Adding photos: "
  rand(3..8).times do |j|
    Photo.create!(
      listing_complex: complex,
      image: download_image("#{complex.id}#{j}", j),
      main: j.zero?,
      order: j + 1
    )
    print "📸 "
  end
  puts "✓"

  print "    Creating listings: "
  listings_count = rand(3..8)
  listings_count.times do |j|
    content = with_locales do |_locale|
      {
        title: Faker::Lorem.sentence,
        description: Faker::Lorem.paragraphs(number: 3).join("\n\n"),
        features: Faker::Lorem.words(number: rand(3..8))
      }
    end

    listing = Listing.new(
      listing_complex: complex,
      stats: {
        bedrooms: rand(1..6),
        bathrooms: rand(1..4),
        parking: rand(0..3),
        area: rand(50..500)
      },
      address: Faker::Address.full_address,
      features: content[:pt][:features],
      title: content[:pt][:title],
      url: Faker::Internet.url,
      description: content[:pt][:description],
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
      listing.title = content[:en][:title]
      listing.description = content[:en][:description]
      listing.features = content[:en][:features]
      listing.save!(validate: false)
    end
    print "🏠 "
  end
  puts "✓ (#{listings_count} created)"
end

puts "\n#{Time.current} - Creating variables..."
3.times do |i|
  print "  • Variable #{i + 1}/10: "
  content = with_locales do |_locale|
    {
      name: Faker::Company.buzzword,
      value: [Faker::Number.number(digits: 6), Faker::Company.bs].sample
    }
  end

  variable = Variable.create!(
    name: content[:pt][:name],
    value: content[:pt][:value],
    icon: ['fas fa-medal', 'fas fa-trophy', 'fas fa-star', 'fas fa-award', 'fas fa-certificate'].sample
  )
  print "Created "

  I18n.with_locale(:en) do
    variable.name = content[:en][:name]
    variable.value = content[:en][:value]
    variable.save!
  end
  puts "✓"
end

puts "\n#{Time.current} - Creating testimonials..."
20.times do |i|
  print "  • Testimonial #{i + 1}/20: "
  content = with_locales do |_locale|
    text = []
    paragraphs = rand(1..4)
    paragraphs.times do
      text << Faker::Lorem.paragraph(sentence_count: rand(4..12))
    end

    {text: text.join("\n\n")}
  end

  testimonial = Testimonial.create!(
    name: Faker::Name.name,
    text: content[:pt][:text]
  )
  print "Created "

  I18n.with_locale(:en) do
    testimonial.text = content[:en][:text]
    testimonial.save!
  end
  puts "✓"
end

puts "\n#{Time.current} - Creating club stories..."
15.times do |i|
  puts "\n  • Story #{i + 1}/15:"
  content = with_locales do |_locale|
    {
      title: Faker::Company.catch_phrase,
      small_description: Faker::Lorem.sentence,
      text: "<p>#{Faker::Lorem.paragraphs(number: 3).join('</p><p>')}</p>"
    }
  end

  print "    Base record... "
  story = ClubStory.create!(
    title: content[:pt][:title],
    small_description: content[:pt][:small_description],
    text: content[:pt][:text],
    hidden: [true, false].sample,
    meta_title: Faker::Marketing.buzzwords,
    meta_description: Faker::Company.catch_phrase,
    video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}"
  )
  puts "✓"

  print "    English translation... "
  I18n.with_locale(:en) do
    story.title = content[:en][:title]
    story.small_description = content[:en][:small_description]
    story.text = content[:en][:text]
    story.save!
  end
  puts "✓"

  print "    Photos: "
  rand(1..5).times do |j|
    image = download_image("story_#{story.id}_#{i}", j)
    if image
      ClubStoryPhoto.create!(
        club_story: story,
        image: image,
        main: j.zero?
      )
      print "📸 "
    else
      print "❌ "
    end
  end
  puts "✓"
end

puts "\n#{Time.current} - Creating blog posts..."
12.times do |i|
  puts "\n  • Blog Post #{i + 1}/12:"
  content = with_locales do |_locale|
    {
      title: Faker::Company.catch_phrase,
      small_description: Faker::Lorem.sentence,
      text: "<p>#{Faker::Lorem.paragraphs(number: 4).join('</p><p>')}</p>"
    }
  end

  print "    Base record... "
  blog_post = BlogPost.create!(
    title: content[:pt][:title],
    small_description: content[:pt][:small_description],
    text: content[:pt][:text],
    hidden: [true, false].sample,
    meta_title: Faker::Marketing.buzzwords,
    meta_description: Faker::Company.catch_phrase,
    video_link: "https://www.youtube.com/embed/#{Faker::Alphanumeric.alpha(number: 11)}"
  )
  puts "✓"

  print "    English translation... "
  I18n.with_locale(:en) do
    blog_post.title = content[:en][:title]
    blog_post.small_description = content[:en][:small_description]
    blog_post.text = content[:en][:text]
    blog_post.save!
  end
  puts "✓"

  print "    Photos: "
  rand(1..6).times do |j|
    image = download_image("blog_#{blog_post.id}_#{i}", j)
    if image
      BlogPhoto.create!(
        blog_post: blog_post,
        image: image,
        main: j.zero?
      )
      print "📸 "
    else
      print "❌ "
    end
  end
  puts "✓"
end

puts "\n#{Time.current} - Creating admin user..."
Admin.create!(
  email: 'admin@example.com',
  password: 'password123',
  confirmed: true
) unless Admin.find_by(email: 'admin@example.com').present?
puts "  • Admin created with email: admin@example.com"

puts "\n#{Time.current} - Creating users and newsletter subscriptions..."
20.times do |i|
  print "  • User #{i + 1}/20: "
  user = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
    confirmed_email: [true, false].sample
  )
  print "Created "

  if rand < 0.7
    NewsletterSubscription.create!(user: user)
    print "with newsletter "
  else
    print "without newsletter "
  end
  puts "✓"
end

puts "\n#{Time.current} - Creating club users..."
15.times do |i|
  print "  • Club User #{i + 1}/15: "
  club_user = ClubUser.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
    terms_accepted: true,
    status: ClubUser.statuses.keys.sample
  )
  print "Created with status: #{club_user.status} "
  puts "✓"
end

puts "\n=== Seed completed successfully! 🎉 ==="
puts "#{Time.current} - Summary:"
puts "  • #{ListingComplex.count} listing complexes"
puts "  • #{Listing.count} listings"
puts "  • #{Variable.count} variables"
puts "  • #{Testimonial.count} testimonials"
puts "  • #{ClubStory.count} club stories"
puts "  • #{BlogPost.count} blog posts"
puts "  • #{User.count} users"
puts "  • #{NewsletterSubscription.count} newsletter subscriptions"
puts "  • #{ClubUser.count} club users"
puts "  • #{Photo.count} photos"
puts "  • #{ClubStoryPhoto.count} club story photos"
puts "  • #{BlogPhoto.count} blog photos"
puts "\nTotal time: #{(Time.current - start_time).round(2)} seconds"
puts "=== End of seed process ===\n"
