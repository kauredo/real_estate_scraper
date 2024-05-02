# frozen_string_literal: true

require 'test_helper'

class ScrapeListingDetailsTest < ActiveSupport::TestCase
  def setup
    Watir.default_timeout = 0.1

    args = ['disable-dev-shm-usage', '--enable-features=NetworkService,NetworkServiceInProcess']
    args << 'headless' if ENV.fetch('HEADFULL', '').blank?
    options = Selenium::WebDriver::Chrome::Options.new(args:)
    @browser = Watir::Browser.new(:chrome, options:)

    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing.html')}"
    @listing = Listing.create(url: @imovel_url)
  end

  def teardown
    @browser.close
  end

  test 'scrape_details method should scrape listing details correctly' do
    ScrapeListingDetails.scrape_details(@browser, @imovel_url)

    @listing.reload

    assert_equal '365.000 €', @listing.price
    assert_equal 'agreed', @listing.status
    assert_equal({ 'Quartos' => 'T2',
                   'Área Útil' => '51,25 m²',
                   'Área Bruta (CP)' => '64,29 m²' }, @listing.stats)
    assert_equal 'Estrela, Campo de Ourique, Lisboa', @listing.address
    assert_equal ['Condomínio Fechado', 'Jardim'], @listing.features_pt
    assert @listing.description.include?('Excelente Apartamento T2 com 64,29 m² + pátio a estrear')
    assert_equal ['https://repstaticneu.azureedge.net/images/2001/L/WM/Large/92a22747-0aa3-4c3d-aeef-04f54de15cf3-87ea35e5-bfdf-4498-acaf-3a7bdd977621.jpg',
                  'https://repstaticneu.azureedge.net/images/2001/L/WM/Large/92a22747-0aa3-4c3d-aeef-04f54de15cf3-d6efe47b-3289-44a3-9645-33cd1fd1b99b.jpg'], @listing.photos
  end

  test 'scrape_details method should save correct status' do
    @imovel_url1 = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_stats.html')}"
    @listing1 = Listing.create(url: @imovel_url1)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url1)

    assert_equal @listing1.reload.status, 'standard'

    @imovel_url2 = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_features.html')}"
    @listing2 = Listing.create(url: @imovel_url2)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url2)

    assert_equal @listing2.reload.status, 'recent'

    @imovel_url3 = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_photos.html')}"
    @listing3 = Listing.create(url: @imovel_url3)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url3)

    assert_equal @listing3.reload.status, 'sold'

    @imovel_url4 = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_description.html')}"
    @listing4 = Listing.create(url: @imovel_url4)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url4)

    assert_equal @listing4.reload.status, 'agreed'
  end

  test 'scrape_language_details method should scrape language details correctly' do
    I18n.with_locale(:en) do
      ScrapeListingDetails.scrape_language_details(@browser, @listing, 'English')

      @listing.reload

      assert @listing.description.include?('Excelente Apartamento T2 com 64,29 m² + pátio a estrear')
    end
  end

  test 'scrape_details method should handle listings without stats section' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_stats.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url)
    @listing.reload

    assert_nil @listing.stats
  end

  test 'scrape_details method should handle listings without features section' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_features.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url)
    @listing.reload

    assert_equal([], @listing.features)
  end

  test 'scrape_details method should handle listings without photos section' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_photos.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url)
    @listing.reload

    assert_equal([], @listing.photos)
  end

  test 'scrape_details method should handle listings without address section' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_address.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_details(@browser, @imovel_url)
    @listing.reload

    assert_nil @listing.address
  end

  test 'scrape_language_details method should handle listings without description' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_description.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_language_details(@browser, @listing, 'Português')

    @listing.reload

    assert_nil @listing.description
  end

  test 'scrape_language_details method should handle language not available' do
    ScrapeListingDetails.scrape_language_details(@browser, @listing, 'French')
    @listing.reload

    assert_raises(Mobility::InvalidLocale) do
      @listing.description_fr
    end
  end

  test 'scrape_language_details method should handle listings without features section' do
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_without_features.html')}"
    @listing = Listing.create(url: @imovel_url)
    ScrapeListingDetails.scrape_language_details(@browser, @listing, 'Português')
    @listing.reload

    assert_equal([], @listing.features)
  end

  test 'scrape_language_details method should handle language available' do
    I18n.with_locale(:en) do
      ScrapeListingDetails.scrape_language_details(@browser, @listing, 'English')
    end

    @listing.reload

    assert @listing.description_en.include?('Excelente Apartamento T2 com 64,29 m² + pátio a estrear')
  end

  test 'scrape_language_details method should destroy listing if deleter from command' do
    @listing = listings(:one)
    @imovel_url = "file://#{Rails.root.join('test', 'fixtures', 'files', 'kw_listing_unavailable.html')}"
    @listing.update(url: @imovel_url)

    assert_difference('Listing.count', -1) do
      ScrapeListingDetails.scrape_language_details(@browser, @listing, 'Português')
    end

    assert @listing.reload.deleted?
  end
end
