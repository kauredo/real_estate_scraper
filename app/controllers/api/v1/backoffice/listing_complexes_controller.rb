# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class ListingComplexesController < BackofficeController
        before_action :find_listing_complex, except: %i[index create photos]
        after_action :update_video_link, only: %i[create update]
        after_action :update_photos, only: %i[create update]

        def index
          @listing_complexes = ListingComplex.all.as_json(include: %i[listings photos], methods: :main_photo)
          render json: @listing_complexes
        end

        def create
          @listing_complex = ListingComplex.new(listing_complex_params)
          if @listing_complex.save
            if params[:photos]
              params[:photos]['image']&.each do |a|
                @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id) if a.present?
              end
            end
            render json: @listing_complex, status: :created
          else
            render json: { errors: @listing_complex.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @listing_complex.slug = nil

          if @listing_complex.update(listing_complex_params)
            if params[:photos] && params[:photos]['image']&.any?(&:present?)
              params[:photos]['image'].each do |a|
                @photo = @listing_complex.photos.create!(image: a, listing_complex_id: @listing_complex.id) if a.present?
              end
            end
            photos
          else
            render json: { errors: @listing_complex.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def photos
          params[:photos]&.each do |id, values|
            next if id == 'image'

            photo = Photo.find(id)
            photo.main = values['main']
            photo.order = values['order']

            photo.save if photo.changed?
          end

          render json: @listing_complex, status: :ok
        end

        def destroy
          @listing_complex.destroy
          head :no_content
        end

        private

        def find_listing_complex
          @listing_complex = ListingComplex.friendly.find(params[:id])
        end

        def update_video_link
          return if @listing_complex.video_link.blank?

          @listing_complex.video_link.sub!('watch?v=', 'embed/')
          @listing_complex.video_link.sub!('youtu.be/', 'youtube.com/embed/')
          @listing_complex.save
        end

        def update_photos
          photos = Photo.unscoped.where(listing_complex_id: @listing_complex.id)
          return unless photos.present? && photos.any? { |photo| photo.order.nil? }

          if photos.all? { |photo| photo.order.nil? }
            photo = photos.first
            photo.main = true
            photo.order = 1
          else
            photo = photos.where(order: nil).first
            photo.order = photos.where.not(order: nil).last.order + 1
          end

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
  end
end
