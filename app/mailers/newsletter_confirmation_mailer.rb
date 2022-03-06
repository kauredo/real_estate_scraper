class NewsletterConfirmationMailer < ApplicationMailer
  def subscription_confirmed
    @user = params[:user]

    mail(to: @user.email, subject: "Subcreveu à Newsletter Sofia Galvão")
  end
end
