# frozen_string_literal: true

require 'test_helper'

class NewsletterSubscriptionsControllerTest < ActionDispatch::IntegrationTest
  test 'should create newsletter subscription and send confirmation email' do
    assert_difference('User.count') do
      assert_difference('NewsletterSubscription.count') do
        post newsletter_subscriptions_path(locale: I18n.locale), params: { newsletter: { email: 'test@example.com', name: 'John Doe' } }
      end
    end

    assert_response :redirect
    assert_equal I18n.t('flash.newsletters.subscribe'), flash[:notice]
    assert_enqueued_jobs 1

    perform_enqueued_jobs

    mail = ActionMailer::Base.deliveries.last
    assert_equal ['test@example.com'], mail.to
    assert_equal 'Subcreveu à Newsletter Sofia Galvão', mail.subject
  end

  test 'should show error flash message on newsletter subscription create when email already exists' do
    user = users(:one)
    user.update(confirmed_email: true)

    assert_no_difference('User.count') do
      assert_no_difference('NewsletterSubscription.count') do
        post newsletter_subscriptions_path(locale: I18n.locale), params: { newsletter: { email: user.email, name: user.name } }
      end
    end

    assert_response :redirect
    assert_equal I18n.t('flash.newsletters.repeat'), flash[:notice]
  end

  test 'should show error flash message on newsletter subscription create when email is invalid' do
    assert_no_difference('User.count') do
      assert_no_difference('NewsletterSubscription.count') do
        post newsletter_subscriptions_path(locale: I18n.locale), params: { newsletter: { email: 'invalid_email' } }
      end
    end

    assert_response :redirect
    assert_equal 'Email não é um email válido, First name não pode estar vazio e Last name não pode estar vazio', flash[:error]
  end

  test 'should update user email confirmed flag on newsletter subscription confirmation' do
    sub = newsletter_subscriptions(:one)
    sub.user.update(confirmed_email: false)
    token = JsonWebToken.encode({ user_id: sub.user_id }, 1.hour.from_now)

    get confirm_newsletter_subscription_path(locale: I18n.locale, id: sub.id), params: { token: }

    assert_response :redirect
    assert_equal I18n.t('flash.newsletters.confirm'), flash[:notice]

    user = User.find(sub.user_id)
    assert user.confirmed_email
  end

  test 'should show error flash message on newsletter subscription confirmation with invalid token' do
    sub = newsletter_subscriptions(:one)
    sub.user.update(confirmed_email: false)
    token = JsonWebToken.encode({ user_id: sub.user_id }, 1.hour.ago)

    get confirm_newsletter_subscription_path(locale: I18n.locale, id: sub.id), params: { token: }

    assert_response :redirect
    assert_equal I18n.t('flash.newsletters.error'), flash[:error]

    user = User.find(sub.user_id)
    assert_not user.confirmed_email
  end
end
