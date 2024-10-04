# frozen_string_literal: true

class Listing < ApplicationRecord
  extend Mobility
  extend FriendlyId

  monetize :price_cents, as: :price, allow_nil: true

  translates :title, :description, :features, :slug
  friendly_id :title, use: %i[mobility history]

  acts_as_paranoid
  after_save :update_orders

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

  def self.random_photos(listings, number)
    listings.sample(number).map { |listing| listing.photos.first }
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[title address status price_cents features]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[listing_complex slugs translation translations]
  end

  def self.possible_stats_keys
    stats = all.map(&:stats).map(&:keys).flatten.uniq.sort_by do |key|
      [
        key == 'Quartos' ? 0 : 1,
        key == 'Casas de Banho' ? 0 : 1,
        key == 'Salas' ? 0 : 1,
        key == 'Estacionamentos' ? 0 : 1,
        key == 'Ano de construção' ? 0 : 1,
        key == 'Área útil' ? 0 : 1,
        key == 'Área bruta (CP)' ? 0 : 1,
        key == 'Área do terreno' ? 0 : 1
      ]
    end

    stats.reject do |key|
      ['Área útil', 'Área bruta (CP)', 'Área do terreno'].include?(key)
    end
  end

  def city
    if CITIES[:south].any? { |c| address&.downcase&.include?(c) }
      I18n.locale == :en ? 'South' : 'Sul'
    else
      I18n.locale == :en ? 'North' : 'Norte'
    end
  end

  def as_json(options = {})
    super.merge(
      'price' => Money.new(price_cents.to_i).format(symbol: nil, no_cents_if_whole: true)
    )
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

# == Schema Information
#
# Table name: listings
#
#  id                 :bigint           not null, primary key
#  address            :string
#  deleted_at         :datetime
#  description        :text
#  features           :string           default([]), is an Array
#  old_status         :string
#  order              :integer
#  photos             :text             default([]), is an Array
#  price_cents        :integer          default(0), not null
#  slug               :string
#  stats              :json
#  status             :integer
#  status_changed_at  :datetime
#  title              :string
#  url                :string
#  video_link         :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  listing_complex_id :bigint
#
# Indexes
#
#  index_listings_on_deleted_at          (deleted_at)
#  index_listings_on_listing_complex_id  (listing_complex_id)
#  index_listings_on_slug                (slug) UNIQUE
#
