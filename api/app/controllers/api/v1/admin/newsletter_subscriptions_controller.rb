# app/controllers/api/v1/admin/club_users_controller.rb
module Api
  module V1
    module Admin
      class NewsletterSubscriptionsController < Api::V1::Admin::BaseController
        def index
          @subs = NewsletterSubscription.includes(:user).where(user: { confirmed_email: true })
          render json: @subs, include: :user
        end
      end
    end
  end
end
