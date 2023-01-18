# frozen_string_literal: true

class Testimonial < ApplicationRecord
  validates :name, uniqueness: { scope: :text }, presence: { message: 'não pode estar vazio' }
  validates :text, presence: { message: 'não pode estar vazio' }
end
