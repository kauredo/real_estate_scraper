# frozen_string_literal: true

require 'test_helper'

class NewContactMailerTest < ActionMailer::TestCase
  def setup
    @user = users(:one)
    @listing = listings(:one)
    @complex = listing_complexes(:one)
  end

  test 'new_contact email' do
    contact = {
      name: @user.name,
      email: @user.email,
      phone: @user.phone,
      message: 'Hello, I am interested in your site',
      listing: nil,
      complex: nil
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal "Novo contacto Site - #{@user.name}", mail.subject
    assert_match 'Hello, I am interested in your site', mail.body.encoded
  end

  test 'new_contact listing email' do
    contact = {
      name: @user.name,
      email: @user.email,
      phone: @user.phone,
      message: 'Hello, I am interested in your listing',
      listing: @listing.slug,
      complex: nil
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal "Novo contacto para imóvel - #{@user.name}", mail.subject
    assert_match 'Hello, I am interested in your listing', mail.body.encoded
    assert_match @listing.title, mail.body.encoded
  end

  test 'new_contact complex email' do
    contact = {
      name: @user.name,
      email: @user.email,
      phone: @user.phone,
      message: 'Hello, I am interested in your complex',
      listing: nil,
      complex: @complex.slug
    }
    mail = NewContactMailer.with(contact:).new_contact

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal [ENV['GMAIL_EMAIL']], mail.to
    assert_equal "Novo contacto para empreendimento - #{@user.name}", mail.subject
    assert_match 'Hello, I am interested in your complex', mail.body.encoded
    assert_match @complex.name, mail.body.encoded
  end
end
