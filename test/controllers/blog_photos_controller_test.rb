require 'test_helper'

class BlogPhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    # Set up any necessary objects or variables here
    @blog_post_id = 1
    Rails.cache.write('blog-id', @blog_post_id)
    @file = fixture_file_upload('photo.webp', 'image/webp')
  end

  test 'should create blog photo' do
    post blog_photos_url(format: :json), params: { file: @file }

    assert_response :success
    assert_equal response.content_type, 'application/json; charset=utf-8'

    body = JSON.parse(response.body)
    assert body.key?('location')
    assert_not_nil body['location']
  end

  test 'should not create blog photo if file not uploaded' do
    post blog_photos_url(format: :json)

    assert_response :success
    assert_nil response.content_type

    assert_empty response.body
  end

  test 'should destroy blog photo' do
    photo = BlogPhoto.create(image: @file, blog_post_id: @blog_post_id)

    delete blog_photo_url(id: photo.id)

    assert_response :success
    assert_nil BlogPhoto.find_by(id: photo.id)
  end

  test 'should return 404 if trying to destroy non-existent blog photo' do
    assert_raises(ActiveRecord::RecordNotFound) do
      delete blog_photo_url(id: 999)
    end
  end

  test 'should return error message if photo cannot be saved' do
    # This test assumes that there is some validation on the BlogPhoto model
    # that would cause a save to fail
    file = fixture_file_upload('test.txt', 'text/plain')

    post blog_photos_url(format: :json), params: { file: }

    assert_response :unprocessable_entity
    assert_equal response.content_type, 'application/json; charset=utf-8'

    body = JSON.parse(response.body)
    assert_equal [], body
  end
end
