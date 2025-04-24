# frozen_string_literal: true

require 'test_helper'

class NewsletterConfirmationMailerTest < ActionMailer::TestCase
  def setup
    @user = users(:one) # This user should have a newsletter subscription
  end

  test 'subscription confirmation email' do
    mail = NewsletterConfirmationMailer.with(user: @user).subscription_confirmed

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [@user.email], mail.to
    assert_equal 'Subcreveu à Newsletter Sofia Galvão', mail.subject
    assert_match @user.newsletter_subscription.id.to_s, mail.body.to_s
    assert_match JsonWebToken.encode(user_id: @user.id), mail.body.to_s
    assert_match @user.first_name, mail.body.to_s
  end
end
