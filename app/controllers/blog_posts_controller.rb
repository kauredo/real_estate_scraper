class BlogPostsController < ApplicationController
  def index
    @blog_posts = BlogPost.visible
  end

  def show
    @blog_post = BlogPost.find(params[:id])
    @resource = {
      path: edit_backoffice_blog_post_path(@blog_post),
      name: I18n.t('blog_posts.resource')
    }
  end
end
