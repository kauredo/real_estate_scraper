# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/new_contact_mailer
class NewContactMailerPreview < ActionMailer::Preview
  def new_contact
    contact = {
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      message: 'Mensagem do cliente vem aqui'
    }
    NewContactMailer.with(contact:).new_contact
  end
end
