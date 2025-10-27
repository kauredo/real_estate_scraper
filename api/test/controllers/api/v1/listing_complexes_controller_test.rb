# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ListingComplexesControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant(tenants(:one))
        @listing_complex = listing_complexes(:one)
      end

      test 'should get index' do
        get_with_api_key api_v1_listing_complexes_path
        assert_response :success

        json = response.parsed_body
        assert_not_nil json['listing_complexes']
        assert_not_nil json['pagination']
      end

      test 'should show listing_complex by id' do
        get_with_api_key api_v1_listing_complex_path(@listing_complex)
        assert_response :success

        json = response.parsed_body
        data = json['listing_complex'] || json
        assert_equal @listing_complex.id, data['id']
      end

      test 'should show listing_complex by slug' do
        get_with_api_key api_v1_listing_complex_path(@listing_complex.slug)
        assert_response :success

        json = response.parsed_body
        data = json['listing_complex'] || json
        assert_equal @listing_complex.id, data['id']
      end

      test 'should not show hidden listing_complex' do
        @listing_complex.update(hidden: true)
        get_with_api_key api_v1_listing_complex_path(@listing_complex)
        assert_response :not_found
      end
    end
  end
end
