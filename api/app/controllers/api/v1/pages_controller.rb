# frozen_string_literal: true

module Api
  module V1
    class PagesController < Api::V1::BaseController
      def home
        listings = Listing.all.includes([:translations])
        listings_by_geography = listings.by_geography

        render json: {
          listings_by_geography: listings_by_geography.as_json,
          stats: {
            listing_count: listings.count,
            variables: serialize_collection(Variable.all, VariableSerializer)
          },
          photos: Listing.random_photos(listings.available, 3).as_json,
          testimonials: serialize_collection(Testimonial.all, TestimonialSerializer)
        }
      end

      def about
        render json: {
          stats: {
            listing_count: Listing.all.count,
            variables: serialize_collection(Variable.all, VariableSerializer)
          },
          testimonials: serialize_collection(Testimonial.all, TestimonialSerializer)
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

      def serialize_collection(collection, serializer)
        ActiveModelSerializers::SerializableResource.new(
          collection,
          each_serializer: serializer
        ).as_json[collection.klass.name.underscore.pluralize.to_sym]
      end
    end
  end
end
