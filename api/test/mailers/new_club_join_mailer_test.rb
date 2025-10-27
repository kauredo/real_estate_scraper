# frozen_string_literal: true

require 'test_helper'

class NewClubJoinMailerTest < ActionMailer::TestCase
  def setup
    Current.tenant = tenants(:one)
  end

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

    assert_equal ['john.doe@example.com'], mail.to
    assert_equal 'Bem-vindo(a) ao Clube SGG, John Doe!', mail.subject
    assert_match 'John Doe', mail.body.encoded
  end
end
