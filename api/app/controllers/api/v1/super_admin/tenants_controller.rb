# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class TenantsController < Api::V1::BaseController
        skip_before_action :verify_tenant
        before_action :authenticate_admin!
        before_action :require_super_admin!

        def index
          tenants = ::Tenant.order(:name)
          render json: { tenants: tenants.as_json(only: %i[id name slug domain active]) }
        end
      end
    end
  end
end
