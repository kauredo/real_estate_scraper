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
        post backoffice_listing_complexes_path, params: { listing_complex: { name: 'Test Listing Complex', description: 'Test Listing Complex' }, photos: { image: ['photo.webp'] } }
      end

      assert_redirected_to edit_backoffice_listing_complex_path(id: ListingComplex.unscoped.last.slug)
      assert_equal 'Empreendimento criado', flash[:notice]
    end

    test 'should fail to create listing_complex' do
      assert_no_difference('ListingComplex.count') do
        post backoffice_listing_complexes_path, params: { listing_complex: { name: 'meh' } }
      end

      assert_template :new
      assert_equal 'Description não pode estar vazio', flash[:error]
    end

    test 'should get edit' do
      get edit_backoffice_listing_complex_path(@listing_complex, locale: I18n.locale)
      assert_response :success
    end

    test 'should update listing_complex' do
      assert_nil @listing_complex.main_photo
      patch backoffice_listing_complex_path(@listing_complex, locale: I18n.locale), params: { listing_complex: { name: 'Updated Test Listing Complex' }, photos: { image: ['photo.webp'] } }
      @listing_complex.reload
      assert_redirected_to edit_backoffice_listing_complex_path(id: @listing_complex.slug)
      assert_equal 'Empreendimento atualizado', flash[:notice]
      assert_equal 'Updated Test Listing Complex', @listing_complex.name
      assert_not_nil @listing_complex.main_photo
    end

    test 'should update photos listing_complex' do
      photo1 = @listing_complex.photos.create(main: true, order: 1)
      photo2 = @listing_complex.photos.create(main: false, order: 2)

      patch backoffice_listing_complex_path(@listing_complex, locale: I18n.locale), params: { listing_complex: { name: 'Updated Test Listing Complex' }, photos: { "#{photo1.id}": { main: false, order: 1 }, "#{photo2.id}": { main: true } } }
      @listing_complex.reload

      assert_redirected_to edit_backoffice_listing_complex_path(id: @listing_complex.slug)
      assert_equal 'Empreendimento atualizado', flash[:notice]
      assert_equal 'Updated Test Listing Complex', @listing_complex.name
      assert_equal photo2.reload, @listing_complex.main_photo
      assert photo2.main
    end

    test 'should not update listing_complex' do
      patch backoffice_listing_complex_path(@listing_complex, locale: I18n.locale), params: { listing_complex: { description: '' } }

      assert_template :edit
      assert_equal 'Description não pode estar vazio', flash[:error]
    end

    test 'should destroy listing_complex' do
      assert_difference('ListingComplex.count', -1) do
        delete backoffice_listing_complex_path(@listing_complex, locale: I18n.locale)
      end

      assert_redirected_to backoffice_listing_complexes_path
    end
  end
end
