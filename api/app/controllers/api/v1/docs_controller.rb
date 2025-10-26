# frozen_string_literal: true

module Api
  module V1
    class DocsController < Api::V1::BaseController
      def index
        render json: {
          api_version: 'v1',
          available_endpoints: [
            { path: '/api/v1/listings', method: 'GET', description: 'Get all listings with optional filters' },
            { path: '/api/v1/listings/:id', method: 'GET', description: 'Get details of a specific listing' },
            { path: '/api/v1/listing_complexes', method: 'GET', description: 'Get all listing complexes' },
            { path: '/api/v1/listing_complexes/:id', method: 'GET', description: 'Get details of a specific listing complex' },
            { path: '/api/v1/blog_posts', method: 'GET', description: 'Get all blog posts' },
            { path: '/api/v1/blog_posts/:id', method: 'GET', description: 'Get details of a specific blog post' },
            { path: '/api/v1/club_stories', method: 'GET', description: 'Get all club stories' },
            { path: '/api/v1/club_stories/:id', method: 'GET', description: 'Get details of a specific club story' },
            { path: '/api/v1/testimonials', method: 'GET', description: 'Get all testimonials' },
            { path: '/api/v1/variables', method: 'GET', description: 'Get all variables' },
            { path: '/api/v1/contact', method: 'POST', description: 'Send a contact message' },
            { path: '/api/v1/club/join', method: 'POST', description: 'Join the club' },
            { path: '/api/v1/newsletter_subscriptions', method: 'POST', description: 'Subscribe to the newsletter' },
            { path: '/api/v1/newsletter_subscriptions/:id/confirm', method: 'GET', description: 'Confirm newsletter subscription' },
            { path: '/api/v1/home', method: 'GET', description: 'Get home page data' },
            { path: '/api/v1/about', method: 'GET', description: 'Get about page data' },
            { path: '/api/v1/services', method: 'GET', description: 'Get services page data' },
            { path: '/api/v1/contact', method: 'GET', description: 'Get contact page data' },
            { path: '/api/v1/privacy', method: 'GET', description: 'Get privacy policy data' },
            { path: '/api/v1/terms_and_conditions', method: 'GET', description: 'Get terms and conditions data' },
            { path: '/api/v1/faq', method: 'GET', description: 'Get FAQ data' },
            { path: '/api/v1/buy', method: 'GET', description: 'Get buy page data' },
            { path: '/api/v1/sell', method: 'GET', description: 'Get sell page data' },
            { path: '/api/v1/club', method: 'GET', description: 'Get club page data' },
            { path: '/api/v1/club/rules', method: 'GET', description: 'Get club rules data' }
          ]
        }
      end
    end
  end
end
