# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class ListingComplexesControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    def setup
      @listing_complex = listing_complexes(:one)
      @admin = admins(:one)
      sign_in @admin
    end

    test 'should get index' do
      get backoffice_listing_complexes_path
      assert_response :success
    end

    test 'should get new' do
      get new_backoffice_listing_complex_path
      assert_response :success
    end

    test 'should create listing_complex' do
      assert_difference('ListingComplex.count') do
        post backoffice_listing_complexes_path, params: { listing_complex: { name: 'Test Listing Complex', description: 'Test Listing Complex' } }
      end

      assert_redirected_to edit_backoffice_listing_complex_path(id: ListingComplex.unscoped.last.slug)
      assert_equal 'Empreendimento criado', flash[:notice]
    end

    test 'should get edit' do
      get edit_backoffice_listing_complex_path(@listing_complex, locale: I18n.locale)
      assert_response :success
    end

    test 'should update listing_complex' do
      patch backoffice_listing_complex_path(@listing_complex, locale: I18n.locale), params: { listing_complex: { name: 'Updated Test Listing Complex' } }
      @listing_complex.reload
      assert_redirected_to edit_backoffice_listing_complex_path(id: @listing_complex.slug)
      assert_equal 'Empreendimento atualizado', flash[:notice]
      assert_equal 'Updated Test Listing Complex', @listing_complex.name
    end

    test 'should destroy listing_complex' do
      assert_difference('ListingComplex.count', -1) do
        delete backoffice_listing_complex_path(@listing_complex, locale: I18n.locale)
      end

      assert_redirected_to backoffice_listing_complexes_path
    end
  end
end
