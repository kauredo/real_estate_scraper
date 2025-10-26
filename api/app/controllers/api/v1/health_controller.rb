# frozen_string_literal: true

module Api
  module V1
    class HealthController < ApplicationController
      # Health check endpoint - no authentication required
      # Inherits from ApplicationController which doesn't require auth by default

      def show
        # Basic health check - just return 200 OK with a simple status
        render json: { status: 'ok', timestamp: Time.current.iso8601 }, status: :ok
      end
    end
  end
end
