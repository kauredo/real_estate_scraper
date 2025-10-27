# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ListingsControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant
        @listing = listings(:one)
        @listing_complex = listing_complexes(:one)
      end

      test 'should get index' do
        get_with_api_key api_v1_listings_path
        assert_response :success

        json = response.parsed_body
        assert_not_nil json['listings']
        assert_not_nil json['pagination']
      end

      test 'should get index with filters' do
        get_with_api_key api_v1_listings_path, params: {
          q: { objective_eq: '1' }
        }
        assert_response :success

        json = response.parsed_body
        assert_not_nil json['listings']
      end

      test 'should show listing by id' do
        get_with_api_key api_v1_listing_path(@listing)
        assert_response :success

        json = response.parsed_body
        # ActiveModel::Serializer may wrap response, check both formats
        listing_data = json['listing'] || json
        assert_equal @listing.id, listing_data['id']
      end

      test 'should show listing by slug' do
        get_with_api_key api_v1_listing_path(@listing.slug)
        assert_response :success

        json = response.parsed_body
        # ActiveModel::Serializer may wrap response, check both formats
        listing_data = json['listing'] || json
        assert_equal @listing.id, listing_data['id']
      end

      test 'should get buy page' do
        get_with_api_key '/api/v1/buy'
        assert_response :success

        json = response.parsed_body
        assert_not_nil json['listings']
      end

      test 'should get sell page' do
        get_with_api_key '/api/v1/sell'
        assert_response :success
      end
    end
  end
end
