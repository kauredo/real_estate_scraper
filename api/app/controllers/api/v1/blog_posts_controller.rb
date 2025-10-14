# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      include FeatureFlag
      include Previewable

      before_action -> { require_feature!(:blog) }

      def index
        @blog_posts = BlogPost.visible.includes(:blog_photos)
        paginated = paginate(@blog_posts, serializer: BlogPostSerializer)

        render json: {
          blog_posts: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @blog_post = if preview_mode?
                       BlogPost.includes(:blog_photos).friendly.find(params[:id])
                     else
                       BlogPost.visible.includes(:blog_photos).friendly.find(params[:id])
                     end

        render json: @blog_post,
               serializer: BlogPostSerializer,
               include_photos: true
      end

      private

      def controller_content_type
        'blog_post'
      end
    end
  end
end
