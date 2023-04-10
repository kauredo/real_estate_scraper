require 'test_helper'

class Backoffice::BlogPostsControllerTest < ActionDispatch::IntegrationTest
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

    assert_redirected_to backoffice_blog_post_path(id: BlogPost.last.slug)
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

  test 'should destroy blog_post' do
    assert_difference('BlogPost.count', -1) do
      delete backoffice_blog_post_path(id: @blog_post.slug)
    end

    assert_redirected_to backoffice_blog_posts_path
  end
end
