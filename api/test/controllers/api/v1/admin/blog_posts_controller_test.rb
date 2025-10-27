# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    module Admin
      class BlogPostsControllerTest < ActionDispatch::IntegrationTest
        setup do
          setup_tenant
          @admin = admins(:one)
          @blog_post = blog_posts(:one) if defined?(blog_posts)
        end

        test 'should get index as admin' do
          get_as_admin api_v1_admin_blog_posts_path, @admin
          assert_response :success
        end

        test 'should show blog_post as admin' do
          skip('No blog_posts fixture') unless @blog_post
          get_as_admin api_v1_admin_blog_post_path(@blog_post), @admin
          assert_response :success
        end

        test 'should create blog_post as admin' do
          skip('No blog_posts fixture') unless defined?(blog_posts)
          assert_difference('BlogPost.count', 1) do
            post_as_admin api_v1_admin_blog_posts_path, @admin, params: {
              blog_post: {
                title: 'New Blog Post'
              }
            }
          end
          assert_response :success
        end
      end
    end
  end
end
