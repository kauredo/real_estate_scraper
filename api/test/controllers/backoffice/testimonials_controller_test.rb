# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class TestimonialsControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @testimonial = testimonials(:one)
      @admin = admins(:one)
      sign_in @admin
    end

    test 'should get index' do
      get backoffice_testimonials_path
      assert_response :success
    end

    test 'should get new' do
      get new_backoffice_testimonial_path
      assert_response :success
    end

    test 'should create testimonial' do
      assert_difference('Testimonial.count') do
        post backoffice_testimonials_path, params: { testimonial: { name: 'John Doe', text: 'Lorem ipsum' } }
      end

      assert_redirected_to backoffice_testimonials_path
    end

    test 'should not create testimonial with invalid params' do
      assert_no_difference('Testimonial.count') do
        post backoffice_testimonials_path, params: { testimonial: { name: '', text: '' } }
      end

      assert_response :success
      assert_equal 'Name não pode estar vazio. Text não pode estar vazio', flash[:error]
    end

    test 'should get edit' do
      get edit_backoffice_testimonial_path(@testimonial, locale: I18n.locale)
      assert_response :success
    end

    test 'should update testimonial' do
      patch backoffice_testimonial_path(@testimonial, locale: I18n.locale), params: { testimonial: { name: 'John Doe', text: 'Lorem ipsum' } }
      assert_redirected_to backoffice_testimonials_path
    end

    test 'should not update testimonial with invalid params' do
      patch backoffice_testimonial_path(@testimonial, locale: I18n.locale), params: { testimonial: { name: '', text: '' } }
      assert_response :success
      assert_equal 'Name não pode estar vazio. Text não pode estar vazio', flash[:error]
    end

    test 'should destroy testimonial' do
      assert_difference('Testimonial.count', -1) do
        delete backoffice_testimonial_path(@testimonial, locale: I18n.locale)
      end

      assert_redirected_to backoffice_testimonials_path
    end
  end
end
