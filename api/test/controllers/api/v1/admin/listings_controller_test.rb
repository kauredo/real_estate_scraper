# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module Admin
      class ListingsControllerTest < ActionDispatch::IntegrationTest
        setup do
          setup_tenant
          @admin = admins(:one)
          @listing = listings(:one)
        end

        test 'should get index as admin' do
          get_as_admin api_v1_admin_listings_path, @admin
          assert_response :success

          json = response.parsed_body
          assert_not_nil json['listings']
        end

        test 'should show listing as admin' do
          get_as_admin api_v1_admin_listing_path(@listing), @admin
          assert_response :success

          json = response.parsed_body
          data = json['listing'] || json
          assert_equal @listing.id, data['id']
        end

        test 'should create listing as admin' do
          assert_difference('Listing.count', 1) do
            post_as_admin api_v1_admin_listings_path, @admin, params: {
              listing: {
                title: 'New Test Listing',
                price_cents: 100_000,
                objective: 'sale',
                kind: 'apartment'
              }
            }
          end
          assert_response :success
        end

        test 'should update listing as admin' do
          patch_as_admin api_v1_admin_listing_path(@listing), @admin, params: {
            listing: {
              title: 'Updated Title'
            }
          }
          assert_response :success
        end

        test 'should destroy listing as admin' do
          assert_difference('Listing.count', -1) do
            delete_as_admin api_v1_admin_listing_path(@listing), @admin
          end
          assert_response :success
        end

        test 'should update all listings' do
          post_as_admin '/api/v1/admin/listings/update_all', @admin
          assert_response :success
        end
      end
    end
  end
end
