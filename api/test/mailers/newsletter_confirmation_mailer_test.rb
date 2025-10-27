# frozen_string_literal: true

require 'test_helper'

class NewsletterConfirmationMailerTest < ActionMailer::TestCase
  def setup
    @user = users(:one) # This user should have a newsletter subscription
    Current.tenant = tenants(:one)
  end

  test 'subscription confirmation email' do
    mail = NewsletterConfirmationMailer.with(user: @user).subscription_confirmed

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [@user.email], mail.to
    assert_equal 'Subcreveu à Newsletter', mail.subject
    assert_match @user.first_name, mail.body.encoded
  end
end
