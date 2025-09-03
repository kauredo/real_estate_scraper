# frozen_string_literal: true

module Api
  module V1
    class VariablesController < Api::V1::BaseController
      def index
        @variables = Variable.all
        render json: ActiveModel::Serializer::CollectionSerializer.new(
          @variables,
          serializer: VariableSerializer
        )
      end
    end
  end
end
