# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class BlogPostsControllerTest < ActionDispatch::IntegrationTest
      setup do
        setup_tenant
        @blog_post = blog_posts(:one) if defined?(blog_posts)
      end

      test 'should get index' do
        get_with_api_key api_v1_blog_posts_path
        assert_response :success

        json = response.parsed_body
        assert json.is_a?(Array) || json.is_a?(Hash)
      end

      test 'should show blog_post' do
        skip('No blog_posts fixture') unless @blog_post
        get_with_api_key api_v1_blog_post_path(@blog_post)
        assert_response :success
      end
    end
  end
end
