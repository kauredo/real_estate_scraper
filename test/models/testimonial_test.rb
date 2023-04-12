# frozen_string_literal: true

require 'test_helper'

class TestimonialTest < ActiveSupport::TestCase
  test 'should not save testimonial without name' do
    testimonial = Testimonial.new(text: 'This is a testimonial')
    assert_not testimonial.save, 'Saved the testimonial without a name'
    assert_includes testimonial.errors.messages[:name], 'não pode estar vazio'
  end

  test 'should not save testimonial without text' do
    testimonial = Testimonial.new(name: 'John Doe')
    assert_not testimonial.save, 'Saved the testimonial without a text'
    assert_includes testimonial.errors.messages[:text], 'não pode estar vazio'
  end

  test 'should not save testimonial with same name and text' do
    Testimonial.create(name: 'John Doe', text: 'This is a testimonial')
    testimonial = Testimonial.new(name: 'John Doe', text: 'This is a testimonial')
    assert_not testimonial.save, 'Saved the testimonial with the same name and text'
    assert_includes testimonial.errors.messages[:name], 'não está disponível'
  end

  test 'should save testimonial with unique name and text' do
    testimonial = Testimonial.new(name: 'Jane Smith', text: 'This is another testimonial')
    assert testimonial.save, 'Could not save the testimonial'
    assert_empty testimonial.errors.messages
  end

  test 'should include translation when loading testimonials' do
    testimonial = Testimonial.create(name: 'Jane Smith', text: 'This is another testimonial')
    assert_not_nil testimonial.translation, 'Did not include the translation when loading the testimonial'
  end
end
