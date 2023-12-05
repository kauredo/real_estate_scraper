# frozen_string_literal: true

module Api
  module V1
    class ResultsController < ApplicationController
      def index
        listings = Listing.all
        @results = {
          listingCount: listings.count,
          variables: Variable.all
        }
        render json: @results
      end
    end
  end
end
