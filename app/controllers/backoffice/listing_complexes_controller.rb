# frozen_string_literal: true

module Backoffice
  class ListingComplexesController < BackofficeController
    before_action :find_listing_complex, except: %i[index new create photos]
    after_action :update_video_link, only: %i[create update]
    after_action :update_photos, only: %i[create update]

    def index
      @listing_complexes = ListingComplex.all.as_json(include: %i[listings photos], methods: :main_photo)
    end

    def new
      @listing_complex = ListingComplex.new
    end

    def create
      @listing_complex = ListingComplex.new(listing_complex_params)
      if @listing_complex.save
        params[:photos]['image']&.each do |a|
          @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id) if a.present?
        end
        flash[:notice] = 'Empreendimento criado'
        redirect_to edit_backoffice_listing_complex_path(@listing_complex)
      else
        flash.now[:error] = @listing_complex.errors.full_messages.join('. ')
        render :new
      end
    end

    def edit; end

    def update
      @listing_complex.update(listing_complex_params)
      if @listing_complex.update(listing_complex_params)
        if params[:photos]['image']&.any?(&:present?)
          params[:photos]['image'].each do |a|
            @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id) if a.present?
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

        photo.save if photo.changed?
      end

      flash[:notice] = 'Empreendimento atualizado'
      redirect_to edit_backoffice_listing_complex_path(@listing_complex)
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

    def update_photos
      return unless @listing_complex.photos.unscoped.all? { |photo| photo.order.nil? }

      photo = Photo.unscoped.where(listing_complex_id: @listing_complex.id).first
      photo.main = true
      photo.order = 1
      photo.save
    end

    def listing_complex_params
      params.require(:listing_complex).permit(:name,
                                              :description,
                                              :order,
                                              :video_link,
                                              :new_format,
                                              :hidden,
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
