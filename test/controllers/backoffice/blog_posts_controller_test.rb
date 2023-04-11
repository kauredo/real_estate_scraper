# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class BlogPostsControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @blog_post = blog_posts(:one)
      @admin = admins(:one)
      sign_in @admin
    end

    test 'should get index' do
      get backoffice_blog_posts_url
      assert_response :success
    end

    test 'should get new' do
      get new_backoffice_blog_post_url
      assert_redirected_to edit_backoffice_blog_post_path(id: BlogPost.last.slug)
    end

    test 'should create blog_post' do
      assert_difference('BlogPost.count') do
        post backoffice_blog_posts_url, params: { blog_post: { title: 'New blog post' } }
      end

      assert_redirected_to edit_backoffice_blog_post_path(id: BlogPost.last.slug)
    end

    test 'should show blog_post' do
      get backoffice_blog_post_url(@blog_post, locale: I18n.locale)
      assert_response :success
    end

    test 'should get edit' do
      get edit_backoffice_blog_post_url(@blog_post, locale: I18n.locale)
      assert_response :success
    end

    test 'should update blog_post' do
      patch backoffice_blog_post_url(@blog_post, locale: I18n.locale), params: { blog_post: { title: 'Updated blog post' } }

      @blog_post.reload

      assert_redirected_to edit_backoffice_blog_post_path(id: @blog_post.slug)
      assert_equal 'Updated blog post', @blog_post.reload.title
    end

    test 'should create photos on blog_post' do
      assert_equal 'https://sofiagalvaogroup.com/images/banner.webp', @blog_post.main_photo
      @file = fixture_file_upload('photo.webp', 'image/webp')

      patch backoffice_blog_post_url(@blog_post, locale: I18n.locale), params: { blog_post: { title: 'Updated blog post' }, blog_photos: { image: [@file] } }
      @blog_post.reload

      assert_not_equal 'https://sofiagalvaogroup.com/images/banner.webp', @blog_post.main_photo
    end

    test 'should update photos on blog_post' do
      @file = fixture_file_upload('photo.webp', 'image/webp')

      photo1 = @blog_post.blog_photos.create(main: true)
      photo2 = @blog_post.blog_photos.create(main: false, image: @file)

      patch backoffice_blog_post_url(@blog_post, locale: I18n.locale), params: { blog_post: { title: 'Updated blog post' }, blog_photos: { image: [], "#{photo1.id}": { main: false }, "#{photo2.id}": { main: true } } }

      @blog_post.reload

      assert_not photo1.reload.main
      assert photo2.reload.main

      assert_equal photo2.image.url, @blog_post.main_photo
    end

    test 'should destroy blog_post' do
      assert_difference('BlogPost.count', -1) do
        delete backoffice_blog_post_path(id: @blog_post.slug)
      end

      assert_redirected_to backoffice_blog_posts_path
    end
  end
end
