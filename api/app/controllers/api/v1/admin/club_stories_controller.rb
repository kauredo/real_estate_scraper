# frozen_string_literal: true

module Api
  module V1
    module Admin
      class ClubStoriesController < Api::V1::Admin::BaseController
        include Pagy::Backend
        before_action :find_club_story, except: %i[index create]
        after_action :update_video_link, only: %i[create update]

        def index
          @club_stories = ClubStory.all
          paginated = paginate(@club_stories, serializer: ClubStorySerializer)

          render json: {
            club_stories: paginated[:data],
            pagination: paginated[:pagination]
          }
        end

        def show
          render json: @club_story,
                 serializer: ClubStorySerializer,
                 include_photos: true
        end

        def create
          @club_story = ClubStory.new(club_story_params)

          if @club_story.save
            create_club_story_photos if params[:club_story_photos] && params[:club_story_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }

            render json: {
              message: 'História criada com sucesso',
              club_story: ClubStorySerializer.new(@club_story)
            }, status: :created
          else
            render json: { errors: @club_story.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @club_story.update(club_story_params)
            create_club_story_photos if params[:club_story_photos] && params[:club_story_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }
            update_club_story_photos if params[:club_story_photos].present? && (params[:club_story_photos][:image].blank? || params[:club_story_photos][:image].none? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) })

            render json: {
              message: 'História atualizada com sucesso',
              club_story: ClubStorySerializer.new(@club_story, include_photos: true)
            }
          else
            render json: { errors: @club_story.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @club_story.destroy
            render json: { message: 'História apagada com sucesso' }
          else
            render json: { errors: @club_story.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def create_club_story_photos
          upload_errors = []

          params[:club_story_photos][:image].each do |photo|
            next unless photo.is_a?(ActionDispatch::Http::UploadedFile)

            if File.size(photo) > 10_485_760
              upload_errors << 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
            else
              ClubStoryPhoto.create(image: photo, club_story_id: @club_story.id)
            end
          end

          render json: { errors: upload_errors }, status: :unprocessable_entity if upload_errors.any?
        end

        def update_club_story_photos
          params[:club_story_photos].each do |id, values|
            next if id == 'image'

            photo = ClubStoryPhoto.find(id)
            photo.main = values['main']
            photo.save if photo.changed?
          end
        end

        def update_video_link
          return if @club_story.blank? || @club_story.video_link.blank?

          @club_story.video_link.sub!('watch?v=', 'embed/')
          @club_story.video_link.sub!('youtu.be/', 'youtube.com/embed/')
          @club_story.save
        end

        def find_club_story
          @club_story = ClubStory.friendly.find(params[:id])
        end

        def club_story_params
          params.require(:club_story).permit(
            :title,
            :small_description,
            :text,
            :hidden,
            :meta_title,
            :meta_description,
            :video_link,
            club_story_photos: %i[
              id
              club_story_id
              image
              main
            ]
          )
        end
      end
    end
  end
end
