# frozen_string_literal: true

module Api
  module V1
    class TenantsController < Api::V1::BaseController
      before_action :authenticate_admin!
      before_action :require_super_admin!, only: [:index]

      # GET /api/v1/tenants
      def index
        tenants = Tenant.all.order(:name)
        render json: {
          tenants: tenants.map do |tenant|
            {
              id: tenant.id,
              name: tenant.name,
              slug: tenant.slug,
              domain: tenant.domain
            }
          end
        }, status: :ok
      end

      # GET /api/v1/tenant/current
      def current
        if current_admin.super_admin?
          # Super admins don't have a specific tenant, return all features enabled
          render json: {
            tenant: {
              id: nil,
              name: 'Super Admin',
              slug: 'super-admin',
              features: {
                blog_enabled: true,
                club_enabled: true,
                testimonials_enabled: true,
                newsletter_enabled: true,
                listing_complexes_enabled: true
              }
            }
          }, status: :ok
        elsif Current.tenant
          render json: {
            tenant: {
              id: Current.tenant.id,
              name: Current.tenant.name,
              slug: Current.tenant.slug,
              domain: Current.tenant.domain,
              features: {
                blog_enabled: Current.tenant.blog_enabled,
                club_enabled: Current.tenant.club_enabled,
                testimonials_enabled: Current.tenant.testimonials_enabled,
                newsletter_enabled: Current.tenant.newsletter_enabled,
                listing_complexes_enabled: Current.tenant.listing_complexes_enabled
              }
            }
          }, status: :ok
        else
          render json: { error: 'No tenant found' }, status: :not_found
        end
      end

      private

      def require_super_admin!
        unless current_admin.super_admin?
          render json: { error: 'Unauthorized - super admin required' }, status: :forbidden
        end
      end
    end
  end
end
