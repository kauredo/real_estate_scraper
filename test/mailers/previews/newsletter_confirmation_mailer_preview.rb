# frozen_string_literal: true

class NewsletterConfirmationMailerPreview < ActionMailer::Preview
  def subscription_confirmed
    user = User.joins(:newsletter_subscription).first ||
           User.create!(
             email: 'preview@example.com',
             first_name: 'Maria',
             last_name: 'Silva'
           ).tap(&:create_newsletter_subscription!)

    NewsletterConfirmationMailer.with(user:).subscription_confirmed
  end
end
