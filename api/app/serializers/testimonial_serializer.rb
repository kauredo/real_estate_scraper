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

# == Schema Information
#
# Table name: testimonials
#
#  id         :bigint           not null, primary key
#  name       :string
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
