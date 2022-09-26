class Listing < ApplicationRecord
  acts_as_paranoid
  after_save :update_orders

  STATUSES = %W[Novo Reservado Vendido]
  CITIES = %W[Lisboa Porto]

  belongs_to :colleague, optional: true
  belongs_to :listing_complex, optional: true

  default_scope { by_sofia.or(by_colleagues).order_status.order(order: :asc, colleague_id: :desc, created_at: :desc) }
  scope :by_sofia, -> { where(colleague: nil) }
  scope :by_colleagues, -> { where.not(colleague: nil) }
  scope :newest, -> { where(status: "Novo") }
  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :by_city, -> { all.group_by { |l| l.city }.sort_by { |city, _stuff| CITIES.index(city) || Float::INFINITY }.to_h }
  scope :order_status, -> {
    statuses = STATUSES.dup.insert(1, '')
    order(Arel.sql("array_position(ARRAY[#{statuses.map { |x| "'#{x}'" }.join(',')}], status::TEXT)"))
  }

  def city
    address.split(',').last.squish
  end

  private

  def update_orders
    if saved_change_to_order? && Listing.where(order: order).count > 1
      listings = Listing.with_order_above(order)
      listings.each do |listing|
        listing.update(order: listing.order + 1) if listing != self
      end
    end
  end

end
