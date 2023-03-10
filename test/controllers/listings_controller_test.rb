# frozen_string_literal: true

require 'test_helper'

class ListingsControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    listing = Listing.first

    get listing_path(id: listing.id)

    assert_response :success
  end
end
