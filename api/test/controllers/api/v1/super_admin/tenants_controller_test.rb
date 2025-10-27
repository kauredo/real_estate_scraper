# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module SuperAdmin
      class TenantsControllerTest < ActionDispatch::IntegrationTest
        setup do
          @super_admin = admins(:three) # Super admin has no tenant_id
          @tenant = tenants(:one)
        end

        test 'should get index as super admin' do
          get_as_admin api_v1_super_admin_tenants_path, @super_admin
          assert_response :success

          json = response.parsed_body
          assert json.is_a?(Array) || json.is_a?(Hash)
        end

        test 'should show tenant as super admin' do
          get_as_admin api_v1_super_admin_tenant_path(@tenant), @super_admin
          assert_response :success

          json = response.parsed_body
          data = json['tenant'] || json
          assert_equal @tenant.id, data['id']
        end

        test 'should create tenant as super admin' do
          assert_difference('Tenant.count', 1) do
            post_as_admin api_v1_super_admin_tenants_path, @super_admin, params: {
              tenant: {
                name: 'New Test Tenant',
                slug: 'new-test-tenant',
                api_key: 'new_api_key_789'
              }
            }
          end
          assert_response :success
        end

        test 'should update tenant as super admin' do
          patch_as_admin api_v1_super_admin_tenant_path(@tenant), @super_admin, params: {
            tenant: {
              name: 'Updated Tenant Name'
            }
          }
          assert_response :success
        end

        test 'should destroy tenant as super admin' do
          assert_difference('Tenant.count', -1) do
            delete_as_admin api_v1_super_admin_tenant_path(@tenant), @super_admin
          end
          assert_response :success
        end
      end
    end
  end
end
