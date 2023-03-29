class Backoffice::BlogPostsController < BackofficeController
  before_action :find_blog_post, except: %i[index new create]

  def index
    @blog_posts = BlogPost.all
  end

  def show; end

  def new
    @blog_post = BlogPost.new
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)
    @blog_post.save
  end

  def edit; end

  def update
    @blog_post.update(blog_post_params)
  end

  def destroy
    @blog_post.destroy
  end

  private

  def find_blog_post
    @blog_post = BlogPost.find(params[:id])
  end

  def blog_post_params
    params.require(:blog_post).permit(:name)
  end
end
