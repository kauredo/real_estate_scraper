# frozen_string_literal: true

class BlogPostSerializer
  def initialize(blog_post, include_photos: false)
    @blog_post = blog_post
    @include_photos = include_photos
  end

  def as_json
    json = {
      id: @blog_post.id,
      title: @blog_post.title,
      slug: @blog_post.slug,
      small_description: @blog_post.small_description,
      text: @blog_post.text,
      sanitized_text: @blog_post.sanitized_text,
      sample_text: @blog_post.sample_text,
      video_link: @blog_post.video_link,
      meta_title: @blog_post.meta_title,
      meta_description: @blog_post.meta_description,
      hidden: @blog_post.hidden,
      created_at: @blog_post.created_at,
      updated_at: @blog_post.updated_at,
      main_photo: @blog_post.main_photo
    }

    if @include_photos
      json[:blog_photos] = @blog_post.blog_photos.map do |photo|
        {
          id: photo.id,
          image_url: photo.image.url,
          main: photo.main
        }
      end
    end

    json
  end
end
