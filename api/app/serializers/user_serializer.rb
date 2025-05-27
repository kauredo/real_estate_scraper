# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :confirmed_email, :email, :first_name, :last_name, :phone, :created_at, :updated_at, :name

  delegate :confirmed_email, to: :object
  delegate :email, to: :object
  delegate :first_name, to: :object
  delegate :last_name, to: :object
  delegate :phone, to: :object
  delegate :name, to: :object

  has_one :newsletter_subscription
end
