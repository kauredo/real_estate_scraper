# app/controllers/api/v1/admin/club_users_controller.rb
module Api
  module V1
    module Admin
      class ClubUsersController < Api::V1::Admin::BaseController
        def index
          @club_users = ClubUser.order(created_at: :desc)
          render json: @club_users
        end

        def export
          send_data ClubUser.to_csv,
                    filename: "membros-clube-sgg-#{Time.current.strftime('%d-%m-%Y')}.csv",
                    type: 'text/csv',
                    disposition: 'attachment'
        end
      end
    end
  end
end
