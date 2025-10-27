# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module Admin
      class ListingComplexesControllerTest < ActionDispatch::IntegrationTest
        setup do
          setup_tenant
          @admin = admins(:one)
          @listing_complex = listing_complexes(:one)
        end

        test 'should get index as admin' do
          get_as_admin api_v1_admin_listing_complexes_path, @admin
          assert_response :success

          json = response.parsed_body
          assert json.is_a?(Array) || json.is_a?(Hash)
        end

        test 'should show listing_complex as admin' do
          get_as_admin api_v1_admin_listing_complex_path(@listing_complex), @admin
          assert_response :success

          json = response.parsed_body
          data = json['listing_complex'] || json
          assert_equal @listing_complex.id, data['id']
        end

        test 'should create listing_complex as admin' do
          assert_difference('ListingComplex.count', 1) do
            post_as_admin api_v1_admin_listing_complexes_path, @admin, params: {
              listing_complex: {
                name: 'New Test Complex'
              }
            }
          end
          assert_response :success
        end

        test 'should update listing_complex as admin' do
          patch_as_admin api_v1_admin_listing_complex_path(@listing_complex), @admin, params: {
            listing_complex: {
              name: 'Updated Name'
            }
          }
          assert_response :success
        end

        test 'should destroy listing_complex as admin' do
          assert_difference('ListingComplex.count', -1) do
            delete_as_admin api_v1_admin_listing_complex_path(@listing_complex), @admin
          end
          assert_response :success
        end
      end
    end
  end
end
