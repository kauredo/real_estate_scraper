# frozen_string_literal: true

class TestimonialSerializer
  def initialize(testimonial)
    @testimonial = testimonial
  end

  def as_json
    {
      id: @testimonial.id,
      name: @testimonial.name,
      text: @testimonial.text,
      created_at: @testimonial.created_at,
      updated_at: @testimonial.updated_at
    }
  end
end
