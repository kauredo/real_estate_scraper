# frozen_string_literal: true

module Api
  module V1
    class PagesController < Api::V1::BaseController
      def home
        listings = Listing.all.includes([:translations])
        listings_by_geography = listings.by_geography

        render json: {
          listings_by_geography:,
          stats: {
            listing_count: listings.count,
            variables: Variable.includes([:translations]).all.as_json
          },
          photos: Listing.random_photos(listings.available, 3).as_json,
          testimonials: Testimonial.includes([:translations]).all.as_json
        }
      end

      def about
        render json: {
          stats: {
            listing_count: Listing.all.count,
            variables: Variable.all.as_json
          },
          testimonials: Testimonial.all.as_json
        }
      end

      def services
        render json: { message: 'Our services information' }
      end

      def contact_page
        render json: { message: 'Contact us' }
      end

      def contact
        NewContactMailer.with(contact_params).new_contact.deliver_later
        render json: { message: I18n.t('flash.contact.thanks') }, status: :ok
      end

      def privacy
        render json: { message: 'Privacy policy' }
      end

      def terms_and_conditions
        render json: { message: 'Terms and conditions' }
      end

      def faq
        render json: { message: 'Frequently asked questions' }
      end

      private

      def contact_params
        params.require(:contact).permit(:name, :email, :phone, :message, :listing, :complex)
      end
    end
  end
end
