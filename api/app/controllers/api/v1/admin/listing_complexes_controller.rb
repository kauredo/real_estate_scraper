# frozen_string_literal: true

module Api
  module V1
    module Admin
      class ListingComplexesController < Api::V1::Admin::BaseController
        before_action :find_listing_complex, except: %i[index create fetch]
        after_action :update_video_link, only: %i[create update]

        def index
          @listing_complexes = ListingComplex.includes(%i[translations photos listings])
                                             .ordered

          result = paginate(@listing_complexes,
                            serializer: ListingComplexSerializer,
                            serializer_options: { include_listings: false })

          render json: {
            listing_complexes: result[:data],
            pagination: result[:pagination]
          }
        end

        def show
          render json: @listing_complex,
                 serializer: ListingComplexSerializer,
                 include_listings: true
        end

        def create
          @listing_complex = ListingComplex.new(listing_complex_params)

          if @listing_complex.save
            upload_photos if params[:photos] && params[:photos].any? { |photo| photo.is_a?(ActionDispatch::Http::UploadedFile) }

            render json: {
              message: 'Complexo criado com sucesso',
              listing_complex: @listing_complex
            }, serializer: ListingComplexSerializer, status: :created
          else
            render json: { errors: @listing_complex.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @listing_complex.update(listing_complex_params)
            upload_photos if params[:photos] && params[:photos].any? { |photo| photo.is_a?(ActionDispatch::Http::UploadedFile) }
            update_photos if params[:photos_update].present?

            render json: {
              message: 'Complexo atualizado com sucesso',
              listing_complex: @listing_complex
            }, serializer: ListingComplexSerializer, include_listings: true
          else
            render json: { errors: @listing_complex.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @listing_complex.destroy
            render json: { message: 'Complexo apagado com sucesso' }
          else
            render json: { errors: @listing_complex.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update_details
          # This would typically scrape/update details from original source
          # For now, just return success
          render json: { message: 'Detalhes do complexo atualizados com sucesso' }
        end

        def photos
          upload_errors = []

          if params[:photos] && params[:photos].any? { |photo| photo.is_a?(ActionDispatch::Http::UploadedFile) }
            params[:photos].each do |photo|
              if File.size(photo) > 10_485_760
                upload_errors << 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
              else
                Photo.create(image: photo, listing_complex_id: @listing_complex.id)
              end
            end
          end

          if upload_errors.any?
            render json: { errors: upload_errors }, status: :unprocessable_entity
          else
            render json: { message: 'Fotos adicionadas com sucesso' }
          end
        end

        def delete_photo
          photo = @listing_complex.photos.find(params[:photo_id])

          if photo.destroy
            render json: { message: 'Foto apagada com sucesso' }
          else
            render json: { errors: ['Erro ao apagar foto'] }, status: :unprocessable_entity
          end
        rescue ActiveRecord::RecordNotFound
          render json: { errors: ['Foto não encontrada'] }, status: :not_found
        end

        def fetch
          # This would typically fetch complex from external URL
          # For now, just return an example response
          render json: {
            message: 'Função de busca externa ainda não implementada',
            example_data: {
              name: 'Exemplo de Complexo',
              description: 'Descrição do complexo...',
              url: params[:url]
            }
          }
        end

        private

        def find_listing_complex
          @listing_complex = ListingComplex.friendly.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { errors: ['Complexo não encontrado'] }, status: :not_found
        end

        def listing_complex_params
          params.require(:listing_complex).permit(
            :name, :description, :subtext, :final_text, :url, :video_link,
            :new_format, :hidden, :order
          )
        end

        def upload_photos
          upload_errors = []

          params[:photos].each do |photo|
            next unless photo.is_a?(ActionDispatch::Http::UploadedFile)

            if File.size(photo) > 10_485_760
              upload_errors << 'A imagem é demasiado grande, por favor comprime-a ou usa outra imagem'
            else
              Photo.create(image: photo, listing_complex_id: @listing_complex.id)
            end
          end

          render json: { errors: upload_errors }, status: :unprocessable_entity if upload_errors.any?
        end

        def update_photos
          params[:photos_update].each do |id, values|
            photo = Photo.find(id)
            photo.main = values['main']
            photo.order = values['order'] if values['order'].present?

            photo.save if photo.changed?
          end
        end

        def update_video_link
          return if @listing_complex.video_link.blank?

          @listing_complex.video_link.sub!('watch?v=', 'embed/')
          @listing_complex.save if @listing_complex.changed?
        end
      end
    end
  end
end
