# frozen_string_literal: true

require 'test_helper'

class BackofficeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = admins(:one)
    sign_in @admin
  end

  test 'should get index when admin is authenticated and confirmed' do
    get backoffice_url
    assert_response :success
  end

  test 'should redirect to root path when admin is not confirmed' do
    @admin.update(confirmed: nil)
    get backoffice_url
    assert_redirected_to root_path
  end

  test 'should redirect to root path when admin is not authenticated' do
    sign_out @admin
    get backoffice_url
    assert_redirected_to new_admin_session_path
  end
end
