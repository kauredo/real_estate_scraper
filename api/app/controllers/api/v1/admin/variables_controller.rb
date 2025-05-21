# frozen_string_literal: true

module Api
  module V1
    module Admin
      class VariablesController < Api::V1::Admin::BaseController
        def index
          @variables = Variable.all
          render json: @variables.as_json(include: [:translations])
        end

        def create
          @variable = Variable.new(variable_params)
          if @variable.save
            render json: @variable.as_json(include: [:translations]), status: :created
          else
            render json: { errors: @variable.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @variable = Variable.find(params[:id])
          if @variable.update(variable_params)
            render json: @variable.as_json(include: [:translations]), status: :ok
          else
            render json: { errors: @variable.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          @variable = Variable.find(params[:id])
          if @variable.destroy
            head :no_content
          else
            render json: { errors: @variable.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def variable_params
          params.require(:variable).permit(
            :name,
            :value,
            :description,
            translations_attributes: %i[id locale value _destroy]
          )
        end
      end
    end
  end
end
