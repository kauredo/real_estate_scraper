# frozen_string_literal: true

class NewClubJoinMailer < ApplicationMailer
  def new_join_request
    @name = params[:name]
    @email = params[:email]
    @phone = params[:phone]

    mail(to: ENV['GMAIL_EMAIL'], subject: "Nova Inscrição Clube SGG - #{@name}")
  end
end
