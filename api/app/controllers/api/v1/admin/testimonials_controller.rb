# frozen_string_literal: true

module Api
  module V1
    module Admin
      class TestimonialsController < Api::V1::Admin::BaseController
        before_action :find_testimonial, except: %i[index create]

        def index
          @testimonials = Testimonial.all.order(created_at: :desc)

          result = paginate(@testimonials, serializer: TestimonialSerializer)

          render json: {
            testimonials: result[:data],
            pagination: result[:pagination]
          }
        end

        def show
          render json: @testimonial, serializer: TestimonialSerializer
        end

        def create
          @testimonial = Testimonial.new(testimonial_params)

          if @testimonial.save
            render json: {
              message: 'Testemunho criado com sucesso',
              testimonial: TestimonialSerializer.new(@testimonial)
            }, status: :created
          else
            render json: { errors: @testimonial.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @testimonial.update(testimonial_params)
            render json: {
              message: 'Testemunho atualizado com sucesso',
              testimonial: TestimonialSerializer.new(@testimonial)
            }
          else
            render json: { errors: @testimonial.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @testimonial.destroy
            render json: { message: 'Testemunho apagado com sucesso' }
          else
            render json: { errors: @testimonial.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def find_testimonial
          @testimonial = Testimonial.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { errors: ['Testemunho não encontrado'] }, status: :not_found
        end

        def testimonial_params
          params.require(:testimonial).permit(:name, :text)
        end
      end
    end
  end
end
