# frozen_string_literal: true

module Api
  module V1
    class NewsletterSubscriptionsController < Api::V1::BaseController
      before_action :find_subscription, only: [:confirm]

      def create
        @user = User.find_or_initialize_by(email: email_params[:email])
        @user.name = email_params[:name] if email_params[:name]

        if @user.save
          NewsletterSubscription.find_or_create_by(user: @user)

          if @user.confirmed_email
            render json: { message: I18n.t('flash.newsletters.repeat') }, status: :ok
          else
            NewsletterConfirmationMailer.with(user: @user).subscription_confirmed.deliver_later
            render json: { message: I18n.t('flash.newsletters.subscribe') }, status: :ok
          end
        else
          render json: { error: @user.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      def confirm
        decrypted_token = JsonWebToken.decode(params[:token])

        if decrypted_token.present? && (decrypted_token[:user_id] = @sub.user_id && Time.zone.now < Time.zone.at(decrypted_token[:exp]))
          @sub.user.update(confirmed_email: true)
          render json: { message: I18n.t('flash.newsletters.confirm') }, status: :ok
        else
          render json: { error: I18n.t('flash.newsletters.error') }, status: :unprocessable_entity
        end
      end

      private

      def email_params
        params.require(:newsletter).permit(:email, :name, :token)
      end

      def find_subscription
        @sub = NewsletterSubscription.find(params[:id])
      end
    end
  end
end
