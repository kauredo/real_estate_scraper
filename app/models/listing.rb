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
  enum :objective, { other: 0, sale: 1, rent: 2 }, prefix: true
  enum :kind, { other: 0, apartment: 1, house: 2, land: 3, office: 4, garage: 5, parking: 6, store: 7, storage: 8 }, prefix: true
  belongs_to :listing_complex, optional: true
  has_one :translation, class_name: 'Listing::Translation', dependent: :destroy

  default_scope { with_locale_translations.default_order }
  scope :default_order, -> { order(order: :asc, status: :asc, created_at: :desc) }
  scope :with_locale_translations,
        lambda {
          joins(Arel.sql("LEFT JOIN listing_translations ON listing_translations.listing_id = listings.id AND listing_translations.locale = '#{I18n.locale}'"))
        }

  scope :with_order_over, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :by_geography, lambda {
                         all.group_by(&:city).to_h
                       }

  def self.with_deleted_ordered(additional_order = {})
    scope = unscoped
            .joins(Arel.sql("LEFT JOIN listing_translations ON listing_translations.listing_id = listings.id AND listing_translations.locale = '#{I18n.locale}'"))
            .order(Arel.sql('CASE WHEN "listings".deleted_at IS NULL THEN 0 ELSE 1 END'))

    if additional_order.present?
      scope.order(additional_order)
    else
      scope.order(order: :asc, status: :asc, created_at: :desc)
    end
  end

  def self.random_photos(listings, number)
    listings.sample(number).map { |listing| listing.photos.first }
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[title address status price_cents features kind objective]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[listing_complex slugs translation translations]
  end

  def self.possible_stats_keys
    stats = all.map(&:stats).compact.map(&:keys).flatten.uniq.sort_by do |key|
      downcased_key = key.downcase
      [
        downcased_key == 'quartos' ? 0 : 1,
        downcased_key == 'casas de banho' ? 0 : 1,
        downcased_key == 'salas' ? 0 : 1,
        downcased_key == 'estacionamentos' ? 0 : 1,
        downcased_key == 'ano de construção' ? 0 : 1,
        downcased_key == 'área útil' ? 0 : 1,
        downcased_key == 'área bruta (cp)' ? 0 : 1,
        downcased_key == 'área do terreno' ? 0 : 1
      ]
    end

    stats.reject do |key|
      downcased_key = key.downcase
      [
        'área útil',
        'área bruta (cp)',
        'área do terreno',
        'casa de banho social',
        'support staff accommodations',
        'city tax',
        'land tax',
        'ano de construção',
        'garagens',
        'dining rooms',
        'kitchens',
        'piso',
        'pisos',
        'common area ownership (coop)',
        'salas de refeição',
        'cozinhas',
        'furnished'
      ].include?(downcased_key)
    end
  end

  def self.ids_with_title
    unscoped.map(&:as_json).select { |l| l['title'].present? }.pluck('id')
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

  def populate_type_and_objective
    objective = url.split('/')[4]
    type = url.split('/')[5]
    self.objective = case objective&.downcase
                     when 'venda' then 1
                     when 'arrendamento' then 2
                     else 0
                     end

    self.kind = case type&.downcase
                when 'apartamento' then 1
                when 'moradia' then 2
                when 'terreno' then 3
                when 'escritório' then 4
                when 'garagem' then 5
                when 'parqueamento' then 6
                when 'loja' then 7
                when 'arrecadação' then 8
                else 0
                end
  end

  def populate_type_and_objective!
    populate_type_and_objective
    save
  end

  private

  def update_orders
    deleted_with_order = Listing.unscoped.where.not(deleted_at: nil).where.not(order: nil)
    deleted_with_order.update_all(order: nil) if deleted_with_order.any? # rubocop:disable Rails/SkipsModelValidations

    return unless saved_change_to_order? && Listing.where(order:).count > 1

    listings = Listing.with_order_over(order)
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
#  kind               :integer          default("other"), not null
#  objective          :integer          default("other"), not null
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
#  virtual_tour_url   :string
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
