# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module SuperAdmin
      class AdminsControllerTest < ActionDispatch::IntegrationTest
        setup do
          @super_admin = admins(:three) # Super admin has no tenant_id
          @admin = admins(:one)
        end

        test 'should get index as super admin' do
          get_as_admin api_v1_super_admin_admins_path, @super_admin
          assert_response :success

          json = response.parsed_body
          assert json.is_a?(Array) || json.is_a?(Hash)
        end

        test 'should show admin as super admin' do
          get_as_admin api_v1_super_admin_admin_path(@admin), @super_admin
          assert_response :success

          json = response.parsed_body
          data = json['admin'] || json
          assert_equal @admin.id, data['id']
        end

        test 'should create admin as super admin' do
          assert_difference('::Admin.count', 1) do
            post_as_admin api_v1_super_admin_admins_path, @super_admin, params: {
              admin: {
                email: 'newadmin@test.com',
                password: 'password123',
                tenant_id: tenants(:one).id
              }
            }
          end
          assert_response :success
        end

        test 'should update admin as super admin' do
          patch_as_admin api_v1_super_admin_admin_path(@admin), @super_admin, params: {
            admin: {
              email: 'updated@test.com'
            }
          }
          assert_response :success
        end

        test 'should destroy admin as super admin' do
          assert_difference('::Admin.count', -1) do
            delete_as_admin api_v1_super_admin_admin_path(@admin), @super_admin
          end
          assert_response :success
        end
      end
    end
  end
end
