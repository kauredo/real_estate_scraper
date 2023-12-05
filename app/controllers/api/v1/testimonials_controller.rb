# frozen_string_literal: true

module Api
  module V1
    class TestimonialsController < ApplicationController
      def index
        @testimonials = Testimonial.all
        render json: @testimonials
      end
    end
  end
end
