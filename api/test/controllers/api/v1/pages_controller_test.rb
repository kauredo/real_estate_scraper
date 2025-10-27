# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class PagesControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant
      end

      test 'should get home page' do
        get_with_api_key '/api/v1/home'
        assert_response :success
      end

      test 'should get about page' do
        get_with_api_key '/api/v1/about'
        assert_response :success
      end

      test 'should get services page' do
        get_with_api_key '/api/v1/services'
        assert_response :success
      end

      test 'should get contact page' do
        get_with_api_key '/api/v1/contact'
        assert_response :success
      end

      test 'should post contact' do
        post '/api/v1/contact', params: {
          contact: {
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message'
          }
        }, headers: api_key_headers
        assert_response :success
      end
    end
  end
end
