# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class VariablesControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant
      end

      test 'should get index' do
        get_with_api_key api_v1_variables_path
        assert_response :success

        json = response.parsed_body
        assert json.is_a?(Array) || json.is_a?(Hash)
      end
    end
  end
end
