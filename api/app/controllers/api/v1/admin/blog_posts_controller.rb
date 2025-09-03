# frozen_string_literal: true

module Api
  module V1
    module Admin
      class BlogPostsController < Api::V1::Admin::BaseController
        before_action :find_blog_post, except: %i[index create]
        after_action :update_video_link, only: %i[create update]

        def index
          @blog_posts = BlogPost.all
          paginated = paginate(@blog_posts)

          render json: {
            blog_posts: paginated[:data].map { |post| BlogPostSerializer.new(post).as_json },
            pagination: paginated[:pagination]
          }
        end

        def show
          render json: BlogPostSerializer.new(@blog_post, include_photos: true).as_json
        end

        def create
          @blog_post = BlogPost.new(blog_post_params)

          if @blog_post.save
            create_blog_photos if params[:blog_photos] && params[:blog_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }

            render json: {
              message: 'Post criado com sucesso',
              blog_post: BlogPostSerializer.new(@blog_post).as_json
            }, status: :created
          else
            render json: { errors: @blog_post.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @blog_post.update(blog_post_params)
            create_blog_photos if params[:blog_photos] && params[:blog_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }
            update_blog_photos if params[:blog_photos].present? && (params[:blog_photos][:image].blank? || params[:blog_photos][:image].none? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) })

            render json: {
              message: 'Post atualizado com sucesso',
              blog_post: BlogPostSerializer.new(@blog_post, include_photos: true).as_json
            }
          else
            render json: { errors: @blog_post.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @blog_post.destroy
            render json: { message: 'Post apagado com sucesso' }
          else
            render json: { errors: @blog_post.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def create_blog_photos
          upload_errors = []

          params[:blog_photos][:image].each do |photo|
            next unless photo.is_a?(ActionDispatch::Http::UploadedFile)

            if File.size(photo) > 10_485_760
              upload_errors << 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
            else
              BlogPhoto.create(image: photo, blog_post_id: @blog_post.id)
            end
          end

          render json: { errors: upload_errors }, status: :unprocessable_entity if upload_errors.any?
        end

        def update_blog_photos
          params[:blog_photos].each do |id, values|
            next if id == 'image'

            photo = BlogPhoto.find(id)
            photo.main = values['main']

            photo.save if photo.changed?
          end
        end

        def update_video_link
          return if @blog_post.video_link.blank?

          @blog_post.video_link.sub!('watch?v=', 'embed/')
          @blog_post.video_link.sub!('youtu.be/', 'youtube.com/embed/')
          @blog_post.save
        end

        def find_blog_post
          @blog_post = BlogPost.friendly.find(params[:id])
        end

        def blog_post_params
          params.require(:blog_post).permit(:title,
                                            :small_description,
                                            :text,
                                            :hidden,
                                            :meta_title,
                                            :meta_description,
                                            :video_link,
                                            blog_photos: %i[
                                              id
                                              blog_post_id
                                              image
                                              main
                                            ])
        end
      end
    end
  end
end
