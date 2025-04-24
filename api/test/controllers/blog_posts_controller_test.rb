# frozen_string_literal: true

require 'test_helper'

class BlogPostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    # Set up any necessary objects or variables here
    @blog_post = blog_posts(:one)
  end

  test 'should get index' do
    get blog_url

    assert_response :success
    assert_template 'blog_posts/index'
    assert_select 'h1', I18n.t('blog_posts.header')

    assert_select 'div.bg-white.dark:bg-dark.shadow-md.border.border-gray-200.rounded-lg.max-w-sm.w-96.mb-5'
  end

  test 'should get show' do
    get blog_post_url(@blog_post, locale: I18n.locale)

    assert_response :success
    assert_template 'blog_posts/show'
    assert_select 'h1', @blog_post.title
  end

  test 'should return 404 if trying to access non-existent blog post' do
    get blog_post_url(id: 999, locale: I18n.locale)
    assert_response :not_found
    assert_template 'errors/404'
  end

  test 'should set resource variable in show action' do
    get blog_post_url(@blog_post, locale: I18n.locale)

    assert_response :success
    assert_not_nil assigns(:resource)

    resource = assigns(:resource)
    assert_equal resource[:path], edit_backoffice_blog_post_path(@blog_post)
    assert_equal resource[:name], I18n.t('blog_posts.resource')
  end
end
