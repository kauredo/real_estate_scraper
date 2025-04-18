# frozen_string_literal: true

require 'test_helper'

class NewClubJoinMailerTest < ActionMailer::TestCase
  test 'new_join_request email' do
    params = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+351912345678'
    }
    mail = NewClubJoinMailer.with(params).new_join_request

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal 'Nova Inscrição Clube SGG - John Doe', mail.subject
    assert_match 'John Doe', mail.body.encoded
    assert_match '+351912345678', mail.body.encoded
  end
end
