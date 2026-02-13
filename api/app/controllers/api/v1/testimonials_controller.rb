# frozen_string_literal: true

module Api
  module V1
    class TestimonialsController < Api::V1::BaseController
      include FeatureFlag
      include Cacheable

      before_action -> { require_feature!(:testimonials) }

      def index
        # Set HTTP cache headers (10 minutes - testimonials change infrequently)
        set_cache_headers(max_age: 10.minutes)

        @testimonials = Testimonial.includes(:translations)
        render json: ActiveModel::Serializer::CollectionSerializer.new(
          @testimonials,
          serializer: TestimonialSerializer
        )
      end
    end
  end
end
