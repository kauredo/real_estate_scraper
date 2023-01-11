class NewsletterConfirmationMailer < ApplicationMailer
  def subscription_confirmed
    @user = params[:user]
    @sub = @user.newsletter_subscription
    @token = JsonWebToken.encode(user_id: @user.id)

    mail(to: @user.email, subject: 'Subcreveu à Newsletter Sofia Galvão')
  end
end
