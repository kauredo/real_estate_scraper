# frozen_string_literal: true

class Listing < ApplicationRecord
  extend Mobility
  translates :title, :description, :features
  acts_as_paranoid
  after_save :update_orders

  CITIES = %w[Lisboa Porto].freeze

  enum :status, { recent: 0, standard: 1, agreed: 2, sold: 3 }
  belongs_to :listing_complex, optional: true

  default_scope { order(order: :asc, status: :asc, created_at: :desc) }
  scope :newest, -> { where(status: 'Novo') }
  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :by_city, lambda {
                    all.group_by(&:city).sort_by { |city, _stuff| CITIES.index(city) || Float::INFINITY }.to_h
                  }

  def city
    address.split(',').last.squish
  end

  private

  def update_orders
    return unless saved_change_to_order? && Listing.where(order:).count > 1

    listings = Listing.with_order_above(order)
    listings.each do |listing|
      listing.update(order: listing.order + 1) if listing != self
    end
  end
end
