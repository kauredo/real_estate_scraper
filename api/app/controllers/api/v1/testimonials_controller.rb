# frozen_string_literal: true

module Api
  module V1
    class TestimonialsController < Api::V1::BaseController
      def index
        @testimonials = Testimonial.all
        render json: @testimonials,
               each_serializer: TestimonialSerializer
      end
    end
  end
end
