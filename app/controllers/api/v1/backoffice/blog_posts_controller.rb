# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class BlogPostsController < BackofficeController
        before_action :find_blog_post, except: %i[index create]

        def index
          @blog_posts = BlogPost.all
          render json: @blog_posts.as_json(include: :blog_photos, methods: %i[main_photo sample_text])
        end

        def create
          @blog_post = BlogPost.new(blog_post_params)
          if @blog_post.save
            render json: { blog_post: @blog_post.as_json(include: :blog_photos), message: 'Post criado com sucesso' }, status: :created
          else
            render json: { errors: @blog_post.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def update
          @blog_post.slug = nil

          if @blog_post.update(blog_post_params)
            create_blog_photos if params[:blog_photos] && params[:blog_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }
            update_blog_photos if params[:blog_photos].present? && params[:blog_photos][:image].none? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }

            render json: { blog_post: @blog_post.as_json(include: :blog_photos), message: 'Post atualizado com sucesso' }
          else
            render json: { errors: @blog_post.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def destroy
          @blog_post.destroy
          render json: { message: 'Post eliminado com sucesso' }
        end

        private

        def create_blog_photos
          params[:blog_photos][:image].each do |photo|
            next unless photo.is_a?(ActionDispatch::Http::UploadedFile)

            if File.size(photo) > 10_485_760
              flash[:error] = 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
            else
              BlogPhoto.create(image: photo, blog_post_id: @blog_post.id)
            end
          end
        end

        def update_blog_photos
          params[:blog_photos].each do |id, values|
            next if id == 'image'

            photo = BlogPhoto.find(id)
            photo.main = values['main']

            photo.save if photo.changed?
          end
        end

        def find_blog_post
          @blog_post = BlogPost.friendly.find(params[:id])
        end

        def blog_post_params
          params.require(:blog_post).permit(:title,
                                            :text,
                                            :hidden,
                                            :meta_title,
                                            :meta_description,
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
