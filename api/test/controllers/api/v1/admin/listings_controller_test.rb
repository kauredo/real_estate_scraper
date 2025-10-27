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
          unique_url = "https://www.kwportugal.pt/Apartamento-Venda-Test-#{SecureRandom.hex(8)}"

          post_as_admin api_v1_admin_listings_path, @admin, params: {
            listing: {
              url: unique_url
            }
          }

          assert_response :created

          # Verify the listing was created
          json = JSON.parse(response.body)
          assert_not_nil json['listing']
        end

        test 'should update listing as admin' do
          patch_as_admin api_v1_admin_listing_path(@listing), @admin, params: {
            listing: {
              price_cents: 500_000
            }
          }
          assert_response :success
        end

        test 'should destroy listing as admin' do
          delete_as_admin api_v1_admin_listing_path(@listing), @admin
          assert_response :success

          # Verify listing is soft-deleted
          @listing.reload
          assert_not_nil @listing.deleted_at
        end

        test 'should update all listings' do
          post_as_admin '/api/v1/admin/listings/update_all', @admin
          assert_response :success
        end
      end
    end
  end
end
