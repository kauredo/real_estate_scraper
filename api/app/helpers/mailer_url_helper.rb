# frozen_string_literal: true

module MailerUrlHelper
  # Generate a URL to the frontend app
  # @param path [String] The path to append to the base URL (should start with /)
  # @param tenant [Tenant, nil] The tenant context (defaults to Current.tenant)
  # @return [String] The full frontend URL
  def frontend_url(path = '', tenant: Current.tenant)
    base_url = tenant&.frontend_url || ENV.fetch('DEFAULT_FRONTEND_URL', 'http://localhost:3001')
    "#{base_url}#{path}"
  end

  # Generate URL to a listing detail page on the frontend
  # @param listing [Listing] The listing object
  # @param locale [String, nil] The locale for the URL
  # @return [String] The full URL to the listing
  def listing_frontend_url(listing, locale: nil)
    path = locale.present? ? "/#{locale}/listings/#{listing.slug}" : "/listings/#{listing.slug}"
    frontend_url(path)
  end

  # Generate URL to a listing complex detail page on the frontend
  # @param complex [ListingComplex] The listing complex object
  # @param locale [String, nil] The locale for the URL
  # @return [String] The full URL to the listing complex
  def listing_complex_frontend_url(complex, locale: nil)
    path = locale.present? ? "/#{locale}/complexes/#{complex.slug}" : "/complexes/#{complex.slug}"
    frontend_url(path)
  end

  # Generate URL to newsletter subscription confirmation page
  # @param subscription [NewsletterSubscription] The subscription object
  # @param token [String] The confirmation token
  # @return [String] The full URL to confirm subscription
  def confirm_newsletter_subscription_url(subscription, token)
    frontend_url("/newsletter/confirm?token=#{token}")
  end
end
