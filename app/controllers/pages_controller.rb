class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:new_contact]

  def home
    @listings = Listing.by_city
    @results = {
      listingCount: Listing.all.count,
      variables: Variable.all
    }
    @photos = Listing.by_sofia.map(&:photos).map(&:first).uniq
    @testimonials = Testimonial.all
  end

  def about
    @results = {
      listingCount: Listing.all.count,
      variables: Variable.all
    }
  end

  def services
  end

  def house_360
  end

  def contact
  end

  def new_contact
    NewContactMailer.with(contact: email_params).new_contact.deliver_later

    flash[:notice] = "Obrigado pela sua mensagem. Entraremos em contacto em breve"
    redirect_back(fallback_location: contact_path)
  end

  private

  def email_params
    params.require(:contact).permit(:name, :email, :phone, :message, :listing, :complex)
  end
end
