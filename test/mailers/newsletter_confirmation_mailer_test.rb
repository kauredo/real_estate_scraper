# frozen_string_literal: true

require 'test_helper'

class NewsletterConfirmationMailerTest < ActionMailer::TestCase
  test 'subscription confirmation email' do
    user = users(:one) # Assuming you have a fixture file for users
    mail = NewsletterConfirmationMailer.with(user:).subscription_confirmed

    # Assert that the email has the correct attributes
    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [user.email], mail.to
    assert_equal 'Subcreveu à Newsletter Sofia Galvão', mail.subject

    # Assert that the email body contains the correct content
    assert_match user.newsletter_subscription.id.to_s, mail.body.to_s
    assert_match JsonWebToken.encode(user_id: user.id), mail.body.to_s
  end
end
