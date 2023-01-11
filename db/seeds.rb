Variable.destroy_all

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

Testimonial.destroy_all

testimonials = [
  { name: 'Nir',
    text: 'Sofia found me my home, she is a professional and made the experience so pleasant and safe. I will trust her with all of my future real estate projects!' },
  { name: 'Patrícia Figueiredo',
    text: 'Com o conhecimento de anos espelhado na confiança com que fala do assunto. Nem hesitei...A Sofia fez um trabalho formidável na divulgação do meu imóvel e em 3 tempos chegou ao cliente ideal, eu sózinha levaria muito mais tempo. Recomendo vivamente os seus serviços!' }
]

testimonials.each do |_testimonial|
  Testimonial.create(testimonials)
end
