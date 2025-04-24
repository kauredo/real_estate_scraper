# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class PagesControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    def setup
      @admin = admins(:one)
      sign_in @admin
      Variable.all.destroy_all
      User.all.destroy_all
      NewsletterSubscription.all.destroy_all
    end

    test 'should get home' do
      # Create some sample data to be used in the test
      variable1 = Variable.create(name: 'foo', value: 'bar', icon: 'fas fa-hand-holding-usd')
      variable2 = Variable.create(name: 'baz', value: 'qux', icon: 'fas fa-hand-holding-usd')
      user1 = User.create(name: 'John Cena', email: 'john@example.com', confirmed_email: true)
      user2 = User.create(name: 'Jane Cena', email: 'jane@example.com', confirmed_email: false)
      subscription1 = NewsletterSubscription.create(user: user1)
      subscription2 = NewsletterSubscription.create(user: user2)

      get backoffice_path

      assert_response :success
      assert_template :home

      # Ensure that the view has access to the correct variables
      assert_equal [variable1, variable2], assigns(:variables)

      # Ensure that the view has access to the correct newsletter subscriptions
      assert_equal [subscription1], assigns(:subs)
    end
  end
end
