# frozen_string_literal: true

require 'test_helper'

class BlogPhotoTest < ActiveSupport::TestCase
  test 'should save valid blog photo' do
    blog_post = BlogPost.create(title: 'Test Blog Post', text: 'Lorem ipsum dolor sit amet.')
    blog_photo = BlogPhoto.new(image: "#{file_fixture_path}photo.webp", blog_post:)

    assert blog_photo.save
  end

  test 'should not save blog photo without blog post' do
    blog_photo = BlogPhoto.new(image: "#{file_fixture_path}photo.webp")

    assert_not blog_photo.save
  end

  test 'should update main photo' do
    blog_post = BlogPost.create(title: 'Test Blog Post', text: 'Lorem ipsum dolor sit amet.')
    main_photo = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", main: true, blog_post:)
    other_photo = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", main: false, blog_post:)

    other_photo.update(main: true)

    assert_not main_photo.reload.main
    assert other_photo.reload.main
  end

  test 'should not update main photo when main is false' do
    blog_post = BlogPost.create(title: 'Test Blog Post', text: 'Lorem ipsum dolor sit amet.')
    main_photo = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", main: true, blog_post:)
    other_photo = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", main: false, blog_post:)

    other_photo.update(main: false)

    assert main_photo.reload.main
    assert_not other_photo.reload.main
  end
end

# == Schema Information
#
# Table name: blog_photos
#
#  id           :bigint           not null, primary key
#  image        :text
#  main         :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  blog_post_id :bigint
#
# Indexes
#
#  index_blog_photos_on_blog_post_id  (blog_post_id)
#
