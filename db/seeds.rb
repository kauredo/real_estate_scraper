# frozen_string_literal: true

puts 'Cleaning up existing variables...'
Variable.destroy_all

puts 'Creating new variables...'
variables = [
  {
    name: 'Top 25',
    value: 'Nacional',
    icon: 'fas fa-medal'
  },
  {
    name: 'Prémio',
    value: 'Prata',
    icon: 'fas fa-trophy'
  },
  {
    name: 'Volume de Negócios',
    value: 7_001_825,
    icon: 'fas fa-hand-holding-usd'
  }
]

variables.each do |var|
  Variable.create(var)
end
puts 'Variables created successfully!'

puts 'Cleaning up existing testimonials...'
Testimonial.destroy_all

testimonials = [
  { name: 'Nir',
    text: 'Sofia found me my home, she is a professional and made the experience so pleasant and safe. I will trust her with all of my future real estate projects!' },
  { name: 'Patrícia Figueiredo',
    text: 'Com o conhecimento de anos espelhado na confiança com que fala do assunto. Nem hesitei...A Sofia fez um trabalho formidável na divulgação do meu imóvel e em 3 tempos chegou ao cliente ideal, eu sózinha levaria muito mais tempo. Recomendo vivamente os seus serviços!' }
]

puts 'Creating new testimonials...'
testimonials.each do |testimonial|
  Testimonial.create(testimonial)
end
puts 'Testimonials created successfully!'

puts 'Cleaning up existing club stories and photos...'
ClubStory.destroy_all
ClubStoryPhoto.destroy_all

club_stories = [
  {
    title: 'Parceria exclusiva com a Home Tailor',
    text: '<p>A Sofia Galvão Group tem o prazer de anunciar uma parceria exclusiva com a Home Tailor, líder em design de interiores e mobiliário personalizado. Esta colaboração permite aos nossos clientes acesso a serviços premium de decoração e mobiliário com condições especiais.</p><p>A Home Tailor é conhecida pela sua abordagem única ao design de interiores, criando espaços que refletem a personalidade e estilo de vida de cada cliente.</p>',
    hidden: false,
    meta_title: 'Parceria Home Tailor | Sofia Galvão Group',
    meta_description: 'Descubra os benefícios exclusivos da nossa parceria com a Home Tailor, oferecendo serviços premium de design de interiores aos nossos clientes.',
    video_link: 'https://www.youtube.com/embed/example1'
  },
  {
    title: 'Promovendo o Bem-Estar Animal',
    text: '<p>A Sofia Galvão Group tem orgulho em apoiar a União Zoófila, contribuindo para o bem-estar animal em Portugal. Nossa parceria social reflete nosso compromisso com a responsabilidade social e amor pelos animais.</p><p>Saiba como você pode se juntar a nós nesta causa importante.</p>',
    hidden: false,
    meta_title: 'Apoio à União Zoófila | Sofia Galvão Group',
    meta_description: 'Conheça nossa parceria com a União Zoófila e como estamos ajudando a promover o bem-estar animal em Portugal.',
    video_link: 'https://www.youtube.com/embed/example2'
  },
  {
    title: 'Workshop de Investimento Imobiliário',
    text: '<p>No último sábado, a Sofia Galvão Group realizou um workshop exclusivo sobre investimento imobiliário em Lisboa. O evento contou com a presença de especialistas do mercado e investidores experientes, que compartilharam insights valiosos sobre as tendências do mercado e estratégias de investimento.</p><p>Os participantes tiveram a oportunidade de aprender sobre análise de mercado, financiamento imobiliário e gestão de propriedades.</p>',
    hidden: false,
    meta_title: 'Workshop de Investimento Imobiliário | Sofia Galvão Group',
    meta_description: 'Confira os destaques do nosso workshop exclusivo sobre investimento imobiliário em Lisboa.',
    video_link: 'https://www.youtube.com/embed/example3'
  },
  {
    title: 'Inauguração do Novo Escritório',
    text: '<p>É com grande satisfação que anunciamos a inauguração do nosso novo escritório no coração de Lisboa. Este espaço foi cuidadosamente projetado para oferecer um ambiente acolhedor e profissional, onde podemos receber nossos clientes com o conforto e a atenção que merecem.</p><p>O novo escritório reflete nossa evolução e compromisso com a excelência no atendimento.</p>',
    hidden: false,
    meta_title: 'Novo Escritório em Lisboa | Sofia Galvão Group',
    meta_description: 'Conheça nosso novo escritório no centro de Lisboa, projetado para melhor atender nossos clientes.',
    video_link: 'https://www.youtube.com/embed/example4'
  },
  {
    title: 'Sustentabilidade no Mercado Imobiliário',
    text: '<p>A Sofia Galvão Group está comprometida com a promoção da sustentabilidade no mercado imobiliário. Neste artigo, exploramos as principais tendências em construção sustentável e como elas estão transformando o setor.</p><p>Descubra como os imóveis eco-friendly estão se tornando cada vez mais valorizados e por que investir em propriedades sustentáveis é uma decisão inteligente para o futuro.</p>',
    hidden: false,
    meta_title: 'Sustentabilidade no Mercado Imobiliário | Sofia Galvão Group',
    meta_description: 'Explore as tendências de sustentabilidade no mercado imobiliário e seu impacto no valor das propriedades.',
    video_link: 'https://www.youtube.com/embed/example5'
  }
]

puts 'Creating club stories and their photos...'
club_stories.each do |story_data|
  print "Creating story: #{story_data[:title]}..."
  story = ClubStory.create!(story_data)
  puts ' Done!'

  print "  Adding photos to story..."
  4.times do |i|
    ClubStoryPhoto.create!(
      club_story: story,
      remote_image_url: "https://picsum.photos/800/600?random=#{story.id}#{i}",
      main: i.zero? # First photo will be main
    )
  end
  puts ' Done!'
end
puts 'All club stories and photos created successfully!'

puts 'Checking admin user...'
if Admin.count.zero?
  print 'Creating admin user...'
  Admin.create(
    email: 'vaskafig@gmail.com',
    password: 'password',
    confirmed: true
  )
  puts ' Done!'
else
  puts 'Admin user already exists.'
end

puts 'Seed completed successfully! 🎉'
