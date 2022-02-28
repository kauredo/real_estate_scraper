require "test_helper"

class ListingsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get listings_show_url
    assert_response :success
  end
end
