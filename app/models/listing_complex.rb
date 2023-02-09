# frozen_string_literal: true

class ListingComplex < ApplicationRecord
  extend Mobility
  translates :name, :description, :subtext, :final_text
  has_many :listings, dependent: :destroy
  has_many :photos, dependent: :destroy
  validates :name, presence: { message: 'não pode estar vazio' }
  validates :description, presence: { message: 'não pode estar vazio' }

  default_scope { order(order: :asc) }

  def main_photo
    photos.find_by(main: true) || photos.first
  end
end
