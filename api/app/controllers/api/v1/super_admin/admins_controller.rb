# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class AdminsController < Api::V1::BaseController
        before_action :authenticate_admin!
        before_action :require_super_admin!
        before_action :set_admin, only: %i[show update destroy confirm unconfirm reset_password]

        def index
          admins = Admin.all.includes(:tenant)
          admins = admins.where(tenant_id: params[:tenant_id]) if params[:tenant_id].present?
          admins = admins.where(confirmed: params[:confirmed]) if params[:confirmed].present?
          admins = admins.where('email ILIKE ?', "%#{params[:search]}%") if params[:search].present?

          paginated = paginate(admins, serializer: AdminSerializer)

          render json: {
            admins: paginated[:data],
            pagination: paginated[:pagination]
          }
        end

        def show
          render json: @admin, serializer: AdminSerializer, include_details: true
        end

        def create
          @admin = Admin.new(admin_params)

          if @admin.save
            render json: {
              admin: AdminSerializer.new(@admin).as_json,
              message: I18n.t('super_admin.admins.created')
            }, status: :created
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def update
          if @admin.update(admin_params)
            render json: {
              admin: AdminSerializer.new(@admin).as_json,
              message: I18n.t('super_admin.admins.updated')
            }
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def destroy
          if @admin.id == @current_admin.id
            render json: { error: I18n.t('super_admin.admins.cannot_delete_self') }, status: :forbidden
            return
          end

          @admin.destroy
          render json: { message: I18n.t('super_admin.admins.deleted') }
        end

        def confirm
          @admin.update(confirmed: true)
          render json: {
            admin: { id: @admin.id, email: @admin.email, confirmed: @admin.confirmed },
            message: I18n.t('super_admin.admins.confirmed')
          }
        end

        def unconfirm
          if @admin.id == @current_admin.id
            render json: { error: I18n.t('super_admin.admins.cannot_unconfirm_self') }, status: :forbidden
            return
          end

          @admin.update(confirmed: false)
          render json: {
            admin: { id: @admin.id, email: @admin.email, confirmed: @admin.confirmed },
            message: I18n.t('super_admin.admins.unconfirmed')
          }
        end

        def reset_password
          if params[:password].blank? || params[:password] != params[:password_confirmation]
            render json: { error: I18n.t('super_admin.admins.password_mismatch') }, status: :unprocessable_entity
            return
          end

          @admin.password = params[:password]
          if @admin.save
            render json: { message: I18n.t('super_admin.admins.password_reset') }
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        private

        def set_admin
          @admin = Admin.find(params[:id])
        end

        def admin_params
          params.require(:admin).permit(:email, :password, :password_confirmation, :tenant_id, :confirmed)
        end

        def require_super_admin!
          return if @current_admin&.super_admin?

          render json: { error: I18n.t('super_admin.access_denied') }, status: :forbidden
        end
      end
    end
  end
end
