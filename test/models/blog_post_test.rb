# frozen_string_literal: true

require 'test_helper'

class BlogPostTest < ActiveSupport::TestCase
  test 'should return sample text' do
    blog_post = BlogPost.create(text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit sapien vitae libero fringilla, nec tempor purus euismod. Nulla facilisi. Etiam vel ultrices turpis. Etiam sit amet blandit quam. Donec condimentum lacinia justo. </p><p>&nbsp;</p><p>Mauris rhoncus convallis tellus, et malesuada elit porttitor sed. Morbi scelerisque lacus nec eleifend interdum. Donec vestibulum, sem ac commodo efficitur, orci dolor porttitor turpis, eu vestibulum leo velit sed est.</p>')
    assert_equal 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit sapien vitae libero fringil...', blog_post.sample_text
  end

  test 'should return main photo when exists' do
    blog_post = BlogPost.create
    photo1 = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", blog_post:)
    photo2 = BlogPhoto.create(image: "#{file_fixture_path}photo2.webp", blog_post:)
    photo2.update(main: true)
    assert blog_post.blog_photos.reload.to_a.sort == [photo1, photo2].sort
    assert_nil photo2.image.url, blog_post.main_photo
  end

  test 'should return first photo when main photo does not exist' do
    blog_post = BlogPost.create
    photo1 = BlogPhoto.create(image: "#{file_fixture_path}photo.webp", blog_post:)
    photo2 = BlogPhoto.create(image: "#{file_fixture_path}photo2.webp", blog_post:)
    assert blog_post.blog_photos.to_a.sort == [photo1, photo2].sort
    assert_nil photo1.image.url, blog_post.main_photo
  end

  test 'should return first image from text when there are no photos' do
    blog_post = BlogPost.create(text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit sapien vitae libero fringilla, nec tempor purus euismod. Nulla facilisi. Etiam vel ultrices turpis. Etiam sit amet blandit quam. Donec condimentum lacinia justo. </p><p>&nbsp;</p><p>Mauris rhoncus convallis tellus, et malesuada elit porttitor sed. Morbi scelerisque lacus nec eleifend interdum. Donec vestibulum, sem ac commodo efficitur, orci dolor porttitor turpis, eu vestibulum leo velit sed est.</p><p>&nbsp;</p><p><img src="/images/test-image.png" alt="image"></p>')
    assert_equal '/images/test-image.png', blog_post.main_photo
  end

  test 'should return default image when there are no photos or images in text' do
    blog_post = BlogPost.create
    assert_equal 'https://sofiagalvaogroup.com/images/banner.webp', blog_post.main_photo
  end
end

# == Schema Information
#
# Table name: blog_posts
#
#  id                :bigint           not null, primary key
#  hidden            :boolean          default(TRUE)
#  meta_description  :text
#  meta_title        :text
#  slug              :string
#  small_description :string
#  text              :text
#  title             :string
#  video_link        :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_blog_posts_on_slug  (slug) UNIQUE
#
