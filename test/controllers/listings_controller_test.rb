# frozen_string_literal: true

require 'test_helper'

class ListingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @listing = listings(:one)
  end

  test 'should get show' do
    get listing_path(@listing, locale: I18n.locale)
    assert_response :success

    assert_not_nil assigns(:listing)
    assert_not_nil assigns(:resource)

    assert_react_component 'showPage--Show'
  end

  test 'should get buy' do
    get buy_path
    assert_response :success

    assert_not_nil assigns(:listings)
    assert_not_nil assigns(:pagy)

    assert_select 'h1', I18n.t('buy.header')
    assert_react_component 'indexPage--Listings'
    assert_react_component 'shared--Pagination'
  end

  test 'should get sell' do
    get sell_path
    assert_response :success

    assert_select 'h1', I18n.t('sell.header')
  end
end
