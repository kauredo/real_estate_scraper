# frozen_string_literal: true

module Backoffice
  class PagesController < BackofficeController
    def home
      @variables = Variable.all
      @subs = NewsletterSubscription.includes(:user).where(user: { confirmed_email: true })
    end
  end
end
