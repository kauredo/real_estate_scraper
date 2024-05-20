# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class VariablesController < BackofficeController
        before_action :find_variable, except: %i[index create]

        def index
          @variables = Variable.all
          render json: @variables
        end

        def create
          var = Variable.new(variable_params)
          if var.save
            message = 'Variable created successfully'
            render json: { message:, variable: var }, status: :created
          else
            render json: { errors: var.errors.full_messages.join(', ') }, status: :unprocessable_entity
          end
        end

        def update
          if @variable.update(variable_params)
            message = 'Variable updated successfully'
            render json: { message:, variable: @variable }
          else
            render json: { errors: @variable.errors.full_messages.join(', ') }, status: :unprocessable_entity
          end
        end

        def destroy
          @variable.destroy
          render json: { message: 'Variable deleted successfully' }
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
