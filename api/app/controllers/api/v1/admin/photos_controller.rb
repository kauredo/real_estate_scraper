# frozen_string_literal: true

module Api
  module V1
    module Admin
      class PhotosController < Api::V1::Admin::BaseController
        before_action :find_photo, only: [:destroy]

        def destroy
          if @photo.destroy
            render json: { message: 'Foto apagada com sucesso' }
          else
            render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def find_photo
          @photo = Photo.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { errors: ['Foto não encontrada'] }, status: :not_found
        end
      end
    end
  end
end
