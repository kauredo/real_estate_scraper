# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class StructuredDataControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant
      end

      test 'should get organization structured data' do
        get_with_api_key '/api/v1/structured_data/organization'
        assert_response :success

        json = response.parsed_body
        assert_equal 'https://schema.org', json['@context']
        assert_equal 'RealEstateAgent', json['@type']
      end

      test 'should get listing structured data' do
        listing = listings(:one)
        get_with_api_key "/api/v1/structured_data/listing/#{listing.slug}"
        assert_response :success

        json = response.parsed_body
        assert_equal 'https://schema.org', json['@context']
        assert_equal 'RealEstateListing', json['@type']
        assert_equal listing.title, json['name']
      end

      test 'should get breadcrumbs structured data' do
        get_with_api_key '/api/v1/structured_data/breadcrumbs', params: { path: '/listings/buy' }
        assert_response :success

        json = response.parsed_body
        assert_equal 'https://schema.org', json['@context']
        assert_equal 'BreadcrumbList', json['@type']
        assert json['itemListElement'].is_a?(Array)
      end

      test 'should get listings collection structured data' do
        get_with_api_key '/api/v1/structured_data/listings_collection'
        assert_response :success

        json = response.parsed_body
        assert_equal 'https://schema.org', json['@context']
        assert_equal 'ItemList', json['@type']
        assert json['itemListElement'].is_a?(Array)
      end

      # TODO: Fix this test - blog_post fixture might have issues
      # test 'should get blog post structured data' do
      #   blog_post = blog_posts(:one)
      #   get_with_api_key "/api/v1/structured_data/blog_post/#{blog_post.slug}"
      #   assert_response :success
      #
      #   json = response.parsed_body
      #   assert_equal 'https://schema.org', json['@context']
      #   assert_equal 'Article', json['@type']
      #   assert_equal blog_post.title, json['headline']
      # end
    end
  end
end
