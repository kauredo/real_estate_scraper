# frozen_string_literal: true

require 'test_helper'

class ListingComplexesControllerTest < ActionDispatch::IntegrationTest
  setup do
    # Set up any necessary objects or variables here
    @listing_complex = listing_complexes(:one)
  end

  test 'should get index' do
    get latest_url

    assert_response :success
    assert_template 'listing_complexes/index'
    assert_select 'h1', 'Empreendimentos'

    assert_react_component 'indexPage--Complexes'
  end

  test 'should get show' do
    get listing_complex_url(@listing_complex, locale: I18n.locale)

    assert_response :success
    assert_template 'listing_complexes/show'
    assert_react_component 'listingComplex--NewShow'
  end

  test 'should redirect to latest if listing complex is hidden and current_admin is not confirmed' do
    @listing_complex.update(hidden: true)
    get listing_complex_url(@listing_complex, locale: I18n.locale)

    assert_redirected_to latest_path
  end

  test 'should set resource variable in show action' do
    get listing_complex_url(@listing_complex, locale: I18n.locale)

    assert_response :success
    assert_not_nil assigns(:resource)

    resource = assigns(:resource)
    assert_equal resource[:path], edit_backoffice_listing_complex_path(@listing_complex)
    assert_equal resource[:name], I18n.t('enterprises.resource')
  end
end
