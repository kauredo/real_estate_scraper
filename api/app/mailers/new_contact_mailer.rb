# frozen_string_literal: true

class NewContactMailer < ApplicationMailer
  def new_contact
    contact = params[:contact]
    @name = contact[:name]
    @email = contact[:email]
    @phone = contact[:phone]
    @message = contact[:message]
    @listing = Listing.friendly.find(contact[:listing]) if contact[:listing].present?
    @complex = ListingComplex.friendly.find(contact[:complex]) if contact[:complex].present?

    subject = if @listing
                "Novo contacto para imóvel - #{@name}"
              elsif @complex
                "Novo contacto para empreendimento - #{@name}"
              else
                "Novo contacto Site - #{@name}"
              end

    mail(to: ENV.fetch('GMAIL_EMAIL', nil), subject:)
  end
end
