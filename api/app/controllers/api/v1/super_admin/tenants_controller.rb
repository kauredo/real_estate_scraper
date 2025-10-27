# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class TenantsController < Api::V1::BaseController
        skip_before_action :verify_tenant
        before_action :authenticate_admin!
        before_action :require_super_admin!
        before_action :set_tenant, only: %i[show update destroy toggle_active rotate_api_key]

        def index
          tenants = ::Tenant.order(:name)
          render json: {
            tenants: tenants.as_json(
              only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url created_at],
              methods: [:enabled_features]
            )
          }
        end

        def show
          render json: {
            tenant: @tenant.as_json(
              only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url created_at updated_at],
              methods: [:enabled_features]
            )
          }
        end

        def create
          tenant = ::Tenant.new(tenant_params)

          if tenant.save
            render json: {
              tenant: tenant.as_json(
                only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url api_key created_at],
                methods: [:enabled_features]
              ),
              message: I18n.t('tenants.create.success')
            }, status: :created
          else
            render json: { errors: tenant.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @tenant.update(tenant_params)
            render json: {
              tenant: @tenant.as_json(
                only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url created_at updated_at],
                methods: [:enabled_features]
              ),
              message: I18n.t('tenants.update.success')
            }
          else
            render json: { errors: @tenant.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @tenant.destroy
            render json: { message: I18n.t('tenants.destroy.success') }
          else
            render json: {
              errors: @tenant.errors.full_messages.presence || [I18n.t('tenants.destroy.has_data')]
            }, status: :unprocessable_entity
          end
        end

        def toggle_active
          @tenant.update!(active: !@tenant.active)
          render json: {
            tenant: @tenant.as_json(
              only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url created_at updated_at],
              methods: [:enabled_features]
            ),
            message: I18n.t("tenants.toggle_active.#{@tenant.active? ? 'activated' : 'deactivated'}")
          }
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def rotate_api_key
          @tenant.rotate_api_key!
          render json: {
            api_key: @tenant.api_key,
            message: I18n.t('tenants.rotate_api_key.success')
          }
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def update_features
          tenant = ::Tenant.find(params[:id])

          features_params.each do |feature, value|
            tenant.public_send("#{feature}=", value)
          end

          if tenant.save
            render json: {
              tenant: tenant.as_json(
                only: %i[id name slug domain active contact_email agency_name website_url phone address scraper_source_url created_at updated_at],
                methods: [:enabled_features]
              ),
              message: I18n.t('tenants.update_features.success')
            }
          else
            render json: { errors: tenant.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def set_tenant
          @tenant = ::Tenant.find(params[:id])
        end

        def tenant_params
          params.require(:tenant).permit(:name, :slug, :domain, :contact_email, :active, :agency_name, :website_url, :phone, :address, :scraper_source_url)
        end

        def features_params
          params.require(:features).permit(
            :blog_enabled,
            :club_enabled,
            :testimonials_enabled,
            :newsletter_enabled,
            :listing_complexes_enabled
          )
        end
      end
    end
  end
end
