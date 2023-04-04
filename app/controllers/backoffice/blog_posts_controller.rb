class Backoffice::BlogPostsController < BackofficeController
  before_action :find_blog_post, except: %i[index new create]

  def index
    @blog_posts = BlogPost.all
  end

  def show
    @resource = {
      path: edit_backoffice_blog_post_path(@blog_post),
      name: I18n.t('blog_posts.resource')
    }
  end

  def new
    @blog_post = BlogPost.create
    flash[:notice] = 'Post criado'

    redirect_to edit_backoffice_blog_post_path(@blog_post)
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)
    @blog_post.save

    redirect_to backoffice_blog_post_path(@blog_post)
  end

  def edit
    Rails.cache.write('blog-id', @blog_post.id)
  end

  def update
    @blog_post.slug = nil
    @blog_post.update(blog_post_params)
    update_blog_photos
  end

  def destroy
    @blog_post.destroy
    flash[:notice] = 'Post apagado'
    redirect_to backoffice_blog_posts_path
  end

  private

  def update_blog_photos
    if params[:blog_photos].present?

      params[:blog_photos].each do |id, values|
        next if id == 'image'

        photo = BlogPhoto.find(id)
        photo.main = values['main']

        photo.save if photo.changed?
      end
    end

    if @blog_post.blog_photos
      @blog_post.blog_photos.each do |photo|
        url = photo.image.url
        photo.destroy! unless @blog_post.text.include?(url)
      end
    end

    flash[:notice] = 'Post atualizado'
    redirect_to edit_backoffice_blog_post_path(@blog_post)
  end

  def find_blog_post
    @blog_post = BlogPost.friendly.find(params[:id])
  end

  def blog_post_params
    params.require(:blog_post).permit(:title,
                                      :text,
                                      blog_photos: %i[
                                        id
                                        blog_post_id
                                        image
                                        main
                                      ])
  end
end
