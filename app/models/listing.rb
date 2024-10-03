# frozen_string_literal: true

class Listing < ApplicationRecord
  extend Mobility
  extend FriendlyId

  translates :title, :description, :features, :slug
  friendly_id :title, use: %i[mobility history]

  acts_as_paranoid
  after_save :update_orders
  after_save :remove_currency_from_price

  CITIES = {
    north: %w[porto braga],
    south: ['lisboa', 'oeiras', 'santarém', 'cascais', 'carcavelos', 'faro', 'alcochete',
            'almada', 'amadora', 'barreiro', 'loures', 'mafra', 'moita', 'montijo',
            'odivelas', 'palmela', 'seixal', 'sesimbra', 'setúbal', 'sintra',
            'vila franca de xira', 'évora', 'santarém', 'beja', 'samora correia',
            'elvas', 'portalegre', 'sines', 'rio maior', 'almeirim', 'cartaxo',
            'montemor-o-novo', 'vendas novas', 'ponte de sor', 'vila nova de santo andré',
            'moura', 'santiago do cacém', 'estremoz', 'alcácer do sal', 'reguengos de monsaraz',
            'serpa', 'borba', 'portimão', 'faro', 'loulé', 'quarteira', 'loulé', 'lagos',
            'tavira', 'olhão', 'vila real de santo antónio', 'almancil', 'silves', 'lagoa']
  }.freeze

  enum :status, { recent: 0, standard: 1, agreed: 2, sold: 3, rented: 4, closed: 5 }
  belongs_to :listing_complex, optional: true
  has_one :translation, class_name: 'Listing::Translation', dependent: :destroy

  default_scope { includes(:translation).order(order: :asc, status: :asc, created_at: :desc) }
  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :by_geography, lambda {
                         all.group_by(&:city).to_h
                       }

  def city
    if CITIES[:south].any? { |c| address&.downcase&.include?(c) }
      I18n.locale == :en ? 'South' : 'Sul'
    else
      I18n.locale == :en ? 'North' : 'Norte'
    end
  end

  def self.random_photos(listings, number)
    listings.sample(number).map { |listing| listing.photos.first }
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[address description features price
       slug stats status title url video_link]
  end

  private

  def remove_currency_from_price
    new_price = price&.gsub('€', '')&.strip
    return unless price != new_price

    self.price = new_price
    save
  end

  def update_orders
    return unless saved_change_to_order? && Listing.where(order:).count > 1

    listings = Listing.with_order_above(order)
    listings.each do |listing|
      listing.update(order: listing.order + 1) if listing != self
    end
  end
end
