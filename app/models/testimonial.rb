# frozen_string_literal: true

class Testimonial < ApplicationRecord
  validates :name, uniqueness: { scope: :text }
end
