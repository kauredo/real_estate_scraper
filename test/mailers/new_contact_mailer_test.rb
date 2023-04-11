# frozen_string_literal: true

require 'test_helper'

class NewContactMailerTest < ActionMailer::TestCase
  test 'new_contact email' do
    contact = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      message: 'Hello, I am interested in your site',
      listing: nil,
      complex: nil
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal 'Novo contacto Site - John Doe', mail.subject
    assert_match 'Hello, I am interested in your site', mail.body.encoded
  end

  test 'new_contact listing email' do
    contact = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      message: 'Hello, I am interested in your listing',
      listing: '107',
      complex: nil
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal 'Novo contacto para imóvel - John Doe', mail.subject
    assert_match 'Hello, I am interested in your listing', mail.body.encoded
  end

  test 'new_contact complex email' do
    contact = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      message: 'Hello, I am interested in your complex',
      listing: nil,
      complex: '3'
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal 'Novo contacto para empreendimento - John Doe', mail.subject
    assert_match 'Hello, I am interested in your complex', mail.body.encoded
  end
end
