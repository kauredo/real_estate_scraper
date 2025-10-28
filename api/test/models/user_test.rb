# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'email is required and must be unique and valid' do
    user = User.new(first_name: 'John', last_name: 'Doe')
    assert_not user.valid?
    assert_includes user.errors.full_messages, 'Email não pode estar vazio'
    user.email = 'john.doe@example.com'
    assert user.valid?
    user.save
    user2 = User.new(first_name: 'Jane', last_name: 'Doe', email: 'john.doe@example.com')
    assert_not user2.valid?
    assert_includes user2.errors.full_messages, 'Email não está disponível'
    user2.email = 'invalid email'
    assert_not user2.valid?
    assert_includes user2.errors.full_messages, 'Email não é um email válido'
  end

  test 'first name is required' do
    user = User.new(last_name: 'Doe', email: 'john.doe@example.com')
    assert_not user.valid?
    assert_includes user.errors.full_messages, 'First name não pode estar vazio'
  end

  test 'last name is required' do
    user = User.new(first_name: 'John', email: 'john.doe@example.com')
    assert_not user.valid?
    assert_includes user.errors.full_messages, 'Last name não pode estar vazio'
  end

  test 'name method returns the full name' do
    user = User.new(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com')
    assert_equal 'John Doe', user.name
  end

  test 'name method updates first_name and last_name' do
    user = User.new(email: 'john.doe@example.com')
    user.name = 'John Doe'
    assert_equal 'John', user.first_name
    assert_equal 'Doe', user.last_name
  end

  test 'for_newsletter scope returns users with confirmed emails' do
    user1 = User.create(email: 'john.doe@example.com', first_name: 'John', last_name: 'Doe', confirmed_email: true)
    user2 = User.create(email: 'jane.doe@example.com', first_name: 'Jane', last_name: 'Doe', confirmed_email: false)
    assert_includes User.for_newsletter, user1
    assert_not_includes User.for_newsletter, user2
  end

  test 'user has one newsletter_subscription' do
    user = User.create(email: 'john.doe@example.com', first_name: 'John', last_name: 'Doe', confirmed_email: true)
    newsletter_subscription = NewsletterSubscription.create(user:)
    assert_equal newsletter_subscription, user.newsletter_subscription
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  confirmed_email :boolean
#  email           :string
#  first_name      :string
#  last_name       :string
#  phone           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  tenant_id       :bigint
#
# Indexes
#
#  index_users_on_tenant_email  (tenant_id,email)
#  index_users_on_tenant_id     (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
