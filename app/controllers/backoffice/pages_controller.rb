# frozen_string_literal: true

module Backoffice
  class PagesController < BackofficeController
    def home
      @variables = Variable.all
      @subs = NewsletterSubscription.includes(:user).where(user: { confirmed_email: true })
      @club_users = ClubUser.order(created_at: :desc)
    end

    def export_club_users
      send_data ClubUser.to_csv,
                filename: "membros-clube-sgg-#{Time.current.strftime('%d-%m-%Y')}.csv",
                type: 'text/csv',
                disposition: 'attachment'
    end
  end
end
