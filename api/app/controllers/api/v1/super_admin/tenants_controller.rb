# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class TenantsController < Api::V1::BaseController
        before_action :authenticate_admin!
        before_action :require_super_admin!

        def index
          tenants = Tenant.order(:name)
          render json: { tenants: tenants.as_json(only: %i[id name slug domain active]) }
        end

        private

        def require_super_admin!
          return if @current_admin&.super_admin?

          render json: { error: I18n.t('super_admin.access_denied') }, status: :forbidden
        end
      end
    end
  end
end
