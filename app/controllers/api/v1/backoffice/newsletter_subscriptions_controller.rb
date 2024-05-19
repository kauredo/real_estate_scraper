# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class NewsletterSubscriptionsController < BackofficeController
        def index
          @newsletter_subscriptions = NewsletterSubscription.joins(:user).where(user: { confirmed_email: true })
          render json: @newsletter_subscriptions.to_json(include: :user, methods: [:name])
        end
      end
    end
  end
end
