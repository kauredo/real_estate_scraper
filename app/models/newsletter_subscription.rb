# frozen_string_literal: true

class NewsletterSubscription < ApplicationRecord
  belongs_to :user
end
