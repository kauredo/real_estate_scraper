# frozen_string_literal: true

module Api
  module V1
    class BlogPostsController < ApplicationController
      include Pagy::Backend

      def index
        pagy, @blog_posts = pagy(BlogPost.visible)
        render json: { blog_posts: @blog_posts.as_json(methods: %i[main_photo sample_text]) }, status: :ok
      end

      def show
        @blog_post = BlogPost.friendly.find(params[:id])
        @resource = {
          path: edit_backoffice_blog_post_path(@blog_post),
          name: I18n.t('blog_posts.resource')
        }
      end
    end
  end
end
