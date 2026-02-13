# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      include FeatureFlag
      include Previewable
      include Cacheable

      before_action -> { require_feature!(:blog) }

      def index
        # Set HTTP cache headers (5 minutes)
        set_cache_headers(max_age: 5.minutes)

        @blog_posts = BlogPost.visible.includes(:translations, :blog_photos)
        paginated = paginate(@blog_posts, serializer: BlogPostSerializer)

        render json: {
          blog_posts: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @blog_post = if preview_mode?
                       BlogPost.includes(:translations, :blog_photos).friendly.find(params[:id])
                     else
                       BlogPost.visible.includes(:translations, :blog_photos).friendly.find(params[:id])
                     end

        # Set ETag and Last-Modified headers for conditional GET (skip in preview mode)
        unless preview_mode?
          fresh_when(
            etag: [@blog_post, Current.tenant],
            last_modified: @blog_post.updated_at,
            public: true
          )
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
