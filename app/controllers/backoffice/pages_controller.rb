# frozen_string_literal: true

module Backoffice
  class PagesController < BackofficeController
    def home
      @variables = Variable.all
      @subs = NewsletterSubscription.includes(:user).where(user: { confirmed_email: true })
      @club_users = ClubUser.order(created_at: :desc)
    end
  end
end
