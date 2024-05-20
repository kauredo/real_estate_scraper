# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class VariablesController < BackofficeController
        before_action :find_variable, except: %i[index create update destroy]

        def index
          @variables = Variable.all
          render json: @variables
        end

        def create
          var = Variable.new(variable_params)
          if var.save
            render json: var, status: :created
          else
            render json: { errors: var.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @variable.update(variable_params)
            render json: @variable, status: :ok
          else
            render json: { errors: @variable.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          binding.pry
          @variable.destroy
          head :no_content
        end

        private

        def find_variable
          @variable = Variable.find(params[:id])
        end

        def variable_params
          params.require(:variable).permit(:name, :value, :icon)
        end
      end
    end
  end
end
