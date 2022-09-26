class Testimonial < ApplicationRecord
  validates :name, uniqueness: { scope: :text }
end
