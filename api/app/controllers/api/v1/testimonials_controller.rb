# frozen_string_literal: true

module Api
  module V1
    class TestimonialsController < Api::V1::BaseController
      def index
        @testimonials = Testimonial.all
        render json: ActiveModel::Serializer::CollectionSerializer.new(
          @testimonials,
          serializer: TestimonialSerializer
        )
      end
    end
  end
end
