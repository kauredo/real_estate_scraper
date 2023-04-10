# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class ListingsControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    def setup
      @admin = admins(:one)
      sign_in @admin
    end

    test 'index should return all listings' do
      # Create some listings
      listing1 = listings(:one)
      listing2 = listings(:two)

      # Call index action
      get backoffice_listings_path

      # Check that all listings are returned
      assert_equal [listing1, listing2], Listing.all.first(2)
    end

    test 'create should create a new listing' do
      # Set up listing params
      listing_params = {
        address: '123 Main St',
        price: 100_000,
        title: 'Cozy Home',
        order: 1,
        url: 'https://www.kwportugal.pt/',
        description: 'A lovely home',
        status: 'for_sale',
        features: %w[pool fireplace],
        photos: ['photo1.jpg', 'photo2.jpg'],
        stats: { bedrooms: 2, bathrooms: 2 }
      }

      # Call create action
      assert_difference('Listing.count') do
        post backoffice_listings_path, params: { listing: listing_params }
      end

      # Check that a new listing was created
      assert Listing.exists?(url: listing_params[:url])
    end

    test 'create should not create a new listing with invalid url' do
      # Set up listing params with invalid url
      listing_params = {
        address: '123 Main St',
        price: 100_000,
        title: 'Cozy Home',
        order: 1,
        url: 'https://www.invalidurl.com/',
        description: 'A lovely home',
        status: 'for_sale',
        features: %w[pool fireplace],
        photos: ['photo1.jpg', 'photo2.jpg'],
        stats: { bedrooms: 2, bathrooms: 2 }
      }

      # Call create action
      post backoffice_listings_path, params: { listing: listing_params }

      # Check that a new listing was not created
      assert_not Listing.exists?(url: listing_params[:url])

      # Check that an error flash message was set
      assert_equal "Erro: o link tem que começar por 'https://www.kwportugal.pt/'", flash[:error]
    end

    test 'update should update an existing listing' do
      # Create a listing
      listing = listings(:one)

      # Set up updated listing params
      updated_listing_params = {
        address: '456 Elm St',
        price: 200_000,
        title: 'Spacious Home',
        order: 2,
        url: 'https://www.kwportugal.pt/updated',
        description: 'A spacious home',
        status: 'sold',
        features: %w[pool fireplace garden],
        photos: ['photo3.jpg', 'photo4.jpg'],
        stats: { bedrooms: 3, bathrooms: 2 }
      }

      # Call update action
      patch backoffice_listing_path(id: listing.slug), params: { listing: updated_listing_params }

      # Check that the listing was updated with the new params
      listing.reload
      assert_equal updated_listing_params[:address], listing.address
      assert_equal updated_listing_params[:price], listing.price.to_i
      assert_equal updated_listing_params[:title], listing.title
      assert_equal updated_listing_params[:order], listing.order
      assert_equal updated_listing_params[:url], listing.url
      assert_equal updated_listing_params[:description], listing.description
      assert_equal updated_listing_params[:status], listing.status
    end

    test 'should destroy listing' do
      listing = listings(:one)
      assert_difference('Listing.count', -1) do
        delete backoffice_listing_path(id: listing.slug)
      end

      assert_redirected_to backoffice_listings_path
    end

    test 'should update video link' do
      listing = listings(:two)

      patch backoffice_listing_path(id: listing.slug), params: { listing: { video_link: 'https://www.youtube.com/watch?v=abcdefghijk' } }
      listing.reload

      assert_equal 'https://www.youtube.com/embed/abcdefghijk', listing.video_link
      assert_redirected_to edit_backoffice_listing_path(listing)
    end
  end
end
