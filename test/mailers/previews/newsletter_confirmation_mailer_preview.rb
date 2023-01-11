# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/newsletter_confirmation_mailer
class NewsletterConfirmationMailerPreview < ActionMailer::Preview
  def subscription_confirmed
    NewsletterConfirmationMailer.with(user: User.all.sample).subscription_confirmed
  end
end
