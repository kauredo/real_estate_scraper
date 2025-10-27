# frozen_string_literal: true

class NewsletterConfirmationMailer < TenantMailer
  def subscription_confirmed
    @user = params[:user]
    sub = @user.newsletter_subscription
    @id = sub.id
    @token = JsonWebToken.encode(user_id: @user.id)

    mail(to: @user.email, subject: 'Subcreveu à Newsletter')
  end
end
