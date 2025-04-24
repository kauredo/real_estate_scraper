# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      def index
        @blog_posts = BlogPost.visible
        paginated = paginate(@blog_posts)

        render json: {
          blog_posts: paginated[:data].map { |post| BlogPostSerializer.new(post).as_json },
          pagination: paginated[:pagination]
        }
      end

      def show
        @blog_post = BlogPost.friendly.find(params[:id])
        render json: BlogPostSerializer.new(@blog_post, include_photos: true).as_json
      end
    end
  end
end
