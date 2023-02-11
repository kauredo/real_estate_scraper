# frozen_string_literal: true

class ListingComplex < ApplicationRecord
  extend Mobility
  translates :name, :description, :subtext, :final_text
  has_many :listings, dependent: :destroy
  has_many :photos, dependent: :destroy
  validates :name, presence: { message: 'não pode estar vazio' }
  validates :description, presence: { message: 'não pode estar vazio' }
  after_save :update_orders

  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  default_scope { order(order: :asc) }

  def main_photo
    photos.find_by(main: true) || photos.first
  end

  def listing_prices
    prices = [description, subtext, final_text].join("\r\n").split("\r\n").select { |line| line.include?('€') }
    apt_and_price = prices.map do |text|
      price = text.split('€').first
                  .gsub(/[[:space:]]/, '').gsub(',', '').gsub('.', '')
                  .match(/^[0-9]+$/)&.values_at(0)&.first
      apt = text.split('€').last.downcase
                .gsub('para um', '').gsub('for a', '').gsub('apartamento', '').gsub('apartment', '').gsub('euros', '').gsub('bedroom', '').gsub(',', '').gsub('.', '')
                .strip.capitalize

      [apt, ApplicationHelper.number_to_currency(price, unit: '€', precision: 0, format: '%n %u', delimiter: '.')]
    end
    [prices.first, apt_and_price]
  end

  def update_orders
    return unless saved_change_to_order?

    complexes = ListingComplex.with_order_above(order)
    complexes.each do |complex|
      complex.update(order: complex.order + 1) if complex != self && ListingComplex.where(order: complex.order).count > 1
    end
  end
end
