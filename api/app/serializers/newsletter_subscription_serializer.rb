# frozen_string_literal: true

class NewsletterSubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :created_at, :updated_at

  delegate :user_id, to: :object

  belongs_to :user
end
