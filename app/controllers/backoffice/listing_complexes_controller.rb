# frozen_string_literal: true

module Backoffice
  class ListingComplexesController < BackofficeController
    before_action :find_listing_complex, except: %i[index new create photos]
    after_action :update_video_link, only: %i[create update]

    def index
      @listing_complexes = ListingComplex.all
    end

    def new
      @listing_complex = ListingComplex.new
      @photo = @listing_complex.photos.build
    end

    def create
      @listing_complex = ListingComplex.new(listing_complex_params)
      if @listing_complex.save
        params[:photos]['image']&.each do |a|
          @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id)
        end
        flash[:notice] = 'Empreendimento criado'
        redirect_to backoffice_listing_complexes_path
      else
        flash.now[:error] = @listing_complex.errors.full_messages.join('. ')
        render :new
      end
    end

    def edit; end

    def update
      @listing_complex.update(listing_complex_params)
      if @listing_complex.update(listing_complex_params.except(:title))
        if params[:photos]['image']&.first.present?
          params[:photos]['image'].each do |a|
            @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id)
          end
        end
        photos
      else
        render action: 'edit'
      end
    end

    def photos
      params[:photos].each do |id, values|
        next if id == 'image'

        photo = Photo.find(id)
        photo.main = values['main']
        photo.order = values['order']

        if photo.changed?
          photo.save
          break
        end
      end

      redirect_to backoffice_listing_complexes_path
    end

    def destroy
      @listing_complex.destroy
    end

    private

    def find_listing_complex
      @listing_complex = ListingComplex.find(params[:id])
    end

    def update_video_link
      @listing_complex.video_link.sub!('watch?v=', 'embed/') if @listing_complex.video_link.present?
      @listing_complex.save
    end

    def listing_complex_params
      params.require(:listing_complex).permit(:name,
                                              :description,
                                              :order,
                                              :video_link,
                                              :new_format,
                                              :subtext,
                                              :final_text,
                                              listing_ids: [],
                                              photos: %i[
                                                id
                                                listing_complex_id
                                                image
                                                main
                                                order
                                              ])
    end
  end
end
