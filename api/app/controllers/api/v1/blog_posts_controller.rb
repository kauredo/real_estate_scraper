# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:blog) }

      def index
        @blog_posts = BlogPost.visible
        paginated = paginate(@blog_posts, serializer: BlogPostSerializer)

        render json: {
          blog_posts: paginated[:data],
          pagination: paginated[:pagination]
        }
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
