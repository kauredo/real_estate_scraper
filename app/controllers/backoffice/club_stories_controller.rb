# frozen_string_literal: true

module Backoffice
  class ClubStoriesController < BackofficeController
    before_action :find_club_story, except: %i[index new create]
    after_action :update_video_link, only: %i[create update]

    def index
      club_stories = ClubStory.all
      @club_stories = club_stories.as_json(methods: %i[sample_text main_photo])
    end

    def show
      @club_story = @club_story.as_json(include: %i[club_story_photos], methods: %i[sample_text main_photo])
      @resource = {
        path: edit_backoffice_club_story_path(@club_story),
        name: I18n.t('club_stories.resource')
      }
    end

    def new
      @club_story = ClubStory.create(hidden: true)
      flash[:notice] = 'História criada'
      redirect_to edit_backoffice_club_story_path(@club_story)
    end

    def create
      @club_story = ClubStory.new(club_story_params)
      @club_story.save

      redirect_to edit_backoffice_club_story_path(@club_story)
    end

    def edit; end

    def update
      if @club_story.update(club_story_params)
        create_club_story_photos if params[:club_story_photos] && params[:club_story_photos][:image]&.any? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }
        update_club_story_photos if params[:club_story_photos].present? && params[:club_story_photos][:image].none? { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }

        flash[:notice] = 'História atualizada'
        redirect_to edit_backoffice_club_story_path(@club_story)
      else
        render :edit
      end
    end

    def destroy
      @club_story.destroy
      flash[:notice] = 'História apagada'
      redirect_to backoffice_club_stories_path
    end

    private

    def find_club_story
      @club_story = ClubStory.friendly.find(params[:id])
    end

    def club_story_params
      params.require(:club_story).permit(:title, :text, :hidden, :meta_title,
                                         :meta_description, :video_link,
                                         club_story_photos: %i[id club_story_id image main])
    end

    def create_club_story_photos
      params[:club_story_photos][:image].each do |photo|
        next unless photo.is_a?(ActionDispatch::Http::UploadedFile)

        if File.size(photo) > 10_485_760
          flash[:error] = 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
        else
          ClubStoryPhoto.create(image: photo, club_story_id: @club_story.id)
        end
      end
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
      return if @club_story.video_link.blank?

      @club_story.video_link.sub!('watch?v=', 'embed/')
      @club_story.video_link.sub!('youtu.be/', 'youtube.com/embed/')
      @club_story.save
    end
  end
end
