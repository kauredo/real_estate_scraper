# frozen_string_literal: true

module Backoffice
  class ClubStoriesController < BackofficeController
    before_action :find_club_story, except: %i[index new create]

    def index
      @club_stories = ClubStory.all
    end

    def show
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
      params.require(:club_story).permit(:title, :text, :hidden, :meta_title, :meta_description)
    end
  end
end
