# frozen_string_literal: true

class NewsletterSubscription < ApplicationRecord
  belongs_to :user
  delegate :name, :email, to: :user
end
