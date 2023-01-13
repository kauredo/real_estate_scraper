# frozen_string_literal: true

module Backoffice
  class PagesController < BackofficeController
    def home
      @variables = Variable.all
      @subs = NewsletterSubscription.joins(:user).where(user: { confirmed_email: true })
    end
  end
end
