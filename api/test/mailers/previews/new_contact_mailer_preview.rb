# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/new_contact_mailer
class NewContactMailerPreview < ActionMailer::Preview
  def new_contact
    contact = {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      phone: '+351 912 345 678',
      message: 'Olá, gostaria de saber mais informações sobre os vossos serviços de mediação imobiliária. ' \
               'Tenho um apartamento T3 em Cascais que pretendo vender. ' \
               'Qual seria a melhor altura para agendar uma avaliação?'
    }
    NewContactMailer.with(contact:).new_contact
  end

  def new_contact_with_listing
    listing = Listing.last || create_sample_listing
    contact = {
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      phone: '+351 923 456 789',
      message: "Boa tarde, tenho muito interesse neste imóvel (#{listing.title}). " \
               'Gostaria de agendar uma visita para esta semana se possível. ' \
               'Qual seria a melhor hora para contactarem-me?',
      listing: listing.slug
    }
    NewContactMailer.with(contact:).new_contact
  end

  def new_contact_with_complex
    complex = ListingComplex.last || create_sample_complex
    contact = {
      name: 'António Costa',
      email: 'antonio.costa@example.com',
      phone: '+351 934 567 890',
      message: "Olá, gostaria de mais informações sobre o empreendimento #{complex.name}. " \
               'Em particular, interessam-me as tipologias disponíveis e preços. ' \
               'Também gostaria de saber se têm opções de financiamento.',
      complex: complex.slug
    }
    NewContactMailer.with(contact:).new_contact
  end

  private

  def create_sample_listing
    Listing.new(
      title: 'Apartamento T3 Cascais',
      price: 450_000,
      bedroom_number: 3,
      bathroom_number: 2
    )
  end

  def create_sample_complex
    ListingComplex.new(
      name: 'Residências da Baía',
      description: 'Novo empreendimento de luxo em Cascais'
    )
  end
end
