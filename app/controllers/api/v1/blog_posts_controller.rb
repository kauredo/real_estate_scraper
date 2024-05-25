# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < ApplicationController
      include Pagy::Backend

      def index
        pagy, @blog_posts = pagy(BlogPost.visible)
        render json: { blog_posts: @blog_posts.as_json(methods: %i[main_photo sample_text]), pagy: pagy_metadata(pagy) }, status: :ok
      end

      def show
        @blog_post = BlogPost.friendly.find(params[:id])
        render json: { blog_post: @blog_post.as_json(include: %i[blog_photos], methods: %i[main_photo date_created]) }, status: :ok
      end
    end
  end
end
