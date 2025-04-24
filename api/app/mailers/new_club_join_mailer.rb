# frozen_string_literal: true

class NewClubJoinMailer < ApplicationMailer
  def new_join_request
    @name = params[:name]
    @email = params[:email]
    @phone = params[:phone]

    mail(to: @email, subject: I18n.t('club.mailer.new_join_request.subject', name: @name))
  end
end
