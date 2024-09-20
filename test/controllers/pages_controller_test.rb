# frozen_string_literal: true

require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test 'should get home' do
    get root_path
    assert_response :success
    assert_select 'title', 'Sofia Galvão Group - Juntos criamos Lares Felizes! | Sofia Galvão Group'
    assert_react_component 'homePage--Home' do |props|
      assert_equal Listing.all.by_geography.to_json, props[:listings].to_json
      assert_equal Listing.all.count, props[:results][:listingCount]
      assert_equal Variable.all.to_json, props[:results][:variables].to_json
      assert_equal Listing.first.photos.first, props[:photos].first
      assert_equal Testimonial.all.to_json, props[:testimonials].to_json
    end
  end

  test 'should get about' do
    get about_path
    assert_response :success
    assert_select 'title', 'Sobre Nós | Sofia Galvão Group'
    assert_select 'h1', 'Sobre Nós'
    assert_react_component 'homePage--Results'
  end

  test 'should get services' do
    get services_path
    assert_response :success
    assert_select 'title', 'Serviços | Sofia Galvão Group'
    assert_select 'h1', 'Serviços'
  end

  test 'should get contact' do
    get contact_path
    assert_response :success
    assert_select 'title', 'Contactos | Sofia Galvão Group'
    assert_select 'h1', I18n.t('contacts.contact_us')
  end

  test 'should send email when new_contact is called' do
    assert_difference('ActionMailer::Base.deliveries.size') do
      post new_contact_path, params: { contact: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        message: 'Hello, I would like to get more information about your services.'
      } }

      perform_enqueued_jobs
    end

    assert_redirected_to contact_path
    assert_equal I18n.t('flash.contact.thanks'), flash[:notice]
  end

  test 'should get kw' do
    get kw_path
    assert_response :success
    assert_select 'title', 'KW Portugal | Sofia Galvão Group'
    assert_select 'h1', 'KW Portugal'
  end

  test 'should get privacy' do
    get privacy_path
    assert_response :success
    assert_select 'title', 'Política de Privacidade | Sofia Galvão Group'
    assert_select 'h1', 'Política de Privacidade'
  end

  test 'should get terms_and_conditions' do
    get terms_and_conditions_path
    assert_response :success
    assert_select 'title', 'Termos e Condições | Sofia Galvão Group'
    assert_select 'h1', 'Termos e Condições'
  end
end
