# frozen_string_literal: true

class NewContactMailer < ApplicationMailer
  def new_contact
    contact = params[:contact]
    @name = contact[:name]
    @email = contact[:email]
    @phone = contact[:phone]
    @message = contact[:message]
    @listing = Listing.find(contact[:listing]) if contact[:listing].present?
    @complex = ListingComplex.find(contact[:complex]) if contact[:complex].present?

    subject = if @listing
                "Novo contacto para imóvel - #{@name}"
              elsif @complex
                "Novo contacto para empreendimento - #{@name}"
              else
                "Novo contacto Site - #{@name}"
              end

    mail(to: ENV['MAILER_FROM'], subject:)
  end
end
