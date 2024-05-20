# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class TestimonialsController < BackofficeController
        before_action :find_testimonial, except: %i[create]

        def show
          render json: @testimonial
        end

        def create
          @testimonial = Testimonial.new(testimonial_params)
          if @testimonial.save
            render json: { message: 'Testimonial created successfully', testimonial: @testimonial }
          else
            render json: { errors: @testimonial.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def update
          if @testimonial.update(testimonial_params)
            render json: { message: 'Testimonial updated successfully', testimonial: @testimonial }
          else
            render json: { errors: @testimonial.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def destroy
          @testimonial.destroy
          render json: { message: 'Testimonial deleted successfully' }
        end

        private

        def find_testimonial
          @testimonial = Testimonial.find(params[:id])
        end

        def testimonial_params
          params.require(:testimonial).permit(:name, :text)
        end
      end
    end
  end
end
