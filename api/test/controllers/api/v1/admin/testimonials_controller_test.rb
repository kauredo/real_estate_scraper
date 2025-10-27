# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module Admin
      class TestimonialsControllerTest < ActionDispatch::IntegrationTest
        setup do
          setup_tenant
          @admin = admins(:one)
          @testimonial = testimonials(:one) if defined?(testimonials)
        end

        test 'should get index as admin' do
          get_as_admin api_v1_admin_testimonials_path, @admin
          assert_response :success
        end

        test 'should show testimonial as admin' do
          skip('No testimonials fixture') unless @testimonial
          get_as_admin api_v1_admin_testimonial_path(@testimonial), @admin
          assert_response :success
        end

        test 'should create testimonial as admin' do
          skip('No testimonials fixture') unless defined?(testimonials)
          assert_difference('Testimonial.count', 1) do
            post_as_admin api_v1_admin_testimonials_path, @admin, params: {
              testimonial: {
                name: 'Test Person',
                content: 'Test testimonial'
              }
            }
          end
          assert_response :success
        end
      end
    end
  end
end
