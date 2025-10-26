# frozen_string_literal: true

module Api
  module V1
    class HealthController < ApplicationController
      # Skip all authentication and tenant verification for health checks
      skip_before_action :verify_authenticity_token

      def show
        # Basic health check - just return 200 OK with a simple status
        render json: { status: 'ok', timestamp: Time.current.iso8601 }, status: :ok
      end
    end
  end
end
