# frozen_string_literal: true

class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:new_contact]

  def home
    listings = Listing.all
    @listings = listings.by_geography
    @results = {
      listingCount: listings.count,
      variables: Variable.all
    }
    @photos = Listing.random_photos(listings, 3)
    @testimonials = Testimonial.all
  end

  def about
    @results = {
      listingCount: Listing.all.count,
      variables: Variable.all
    }
    @testimonials = Testimonial.all
  end

  def services; end

  def contact; end

  def privacy; end

  def terms_and_conditions; end

  def new_contact
    NewContactMailer.with(contact: email_params).new_contact.deliver_later

    flash[:notice] = I18n.t('flash.contact.thanks')
    redirect_back(fallback_location: contact_path)
  end

  def faq; end

  private

  def email_params
    params.require(:contact).permit(:name, :email, :phone, :message, :listing, :complex)
  end
end
