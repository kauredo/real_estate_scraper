# frozen_string_literal: true

module Api
  module V1
    module Backoffice
      class TestimonialsController < BackofficeController
        before_action :find_testimonial, except: %i[create]

        def create
          @testimonial = Testimonial.new(testimonial_params)
          if @testimonial.save
            render json: @testimonial, status: :created
          else
            render json: { errors: @testimonial.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @testimonial = Testimonial.find(params[:id])
          if @testimonial.update(testimonial_params)
            render json: @testimonial, status: :ok
          else
            render json: { errors: @testimonial.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          @testimonial = Testimonial.find(params[:id])
          @testimonial.destroy
          head :no_content
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
