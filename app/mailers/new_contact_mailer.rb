class NewContactMailer < ApplicationMailer
  def new_contact
    contact = params[:contact]
    @name = contact[:name]
    @email = contact[:email]
    @phone = contact[:phone]
    @message = contact[:message]

    mail(to: ENV['MAILER_FROM'], subject: "Novo contacto Site - #{@name}")
  end
end
