# frozen_string_literal: true

class Testimonial < ApplicationRecord
  extend Mobility
  translates :text

  has_one :translation, class_name: 'Testimonial::Translation', dependent: :destroy

  validates :name, uniqueness: { scope: :text }, presence: { message: 'não pode estar vazio' }
  validates :text, presence: { message: 'não pode estar vazio' }

  default_scope { includes(:translation) }
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
