# frozen_string_literal: true

module Api
  module V1
    class TestimonialsController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:testimonials) }

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
