require 'test_helper'

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test 'should render 404 page' do
    get error_url(id: 404)
    assert_response :not_found
    assert_template 'errors/404'
  end

  test 'should render 500 page' do
    get error_url(id: 500)
    assert_response :internal_server_error
    assert_template 'errors/500'
  end

  test 'should render default 404 page if wrong code specified' do
    get error_url(id: 0)
    assert_response :not_found
    assert_template 'errors/404'
  end
end
