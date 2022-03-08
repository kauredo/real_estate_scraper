class NewsletterConfirmationMailer < ApplicationMailer
  def subscription_confirmed
    @user = params[:user]
    @sub = @user.newsletter_subscription

    mail(to: @user.email, subject: "Subcreveu à Newsletter Sofia Galvão")
  end
end
