# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      include Pagy::Backend

      def index
        @blog_posts = BlogPost.visible
        paginated = paginate(@blog_posts)

        render json: {
          blog_posts: paginated[:data],
          pagination: paginated[:pagination]
        }, each_serializer: BlogPostSerializer
      end

      def show
        @blog_post = BlogPost.friendly.find(params[:id])
        render json: @blog_post,
               serializer: BlogPostSerializer,
               include_photos: true
      end
    end
  end
end
