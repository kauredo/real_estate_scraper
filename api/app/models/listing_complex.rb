# frozen_string_literal: true

class ListingComplex < ApplicationRecord
  include ActsAsTenant
  extend Mobility
  extend FriendlyId

  translates :name, :description, :subtext, :final_text, :slug
  friendly_id :name, use: %i[mobility history]

  has_many :listings, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_one :translation, class_name: 'ListingComplex::Translation', dependent: :destroy
  validates :name, presence: { message: 'não pode estar vazio' }
  validates :description, presence: { message: 'não pode estar vazio' }
  after_save :update_orders

  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :visible, -> { where.not(hidden: true) }
  scope :ordered, -> { order(order: :asc) }

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

      [apt, ActionController::Base.helpers.number_to_currency(price, unit: '€', precision: 0, format: '%n %u', delimiter: '.')]
    end
    [name, apt_and_price]
  end

  def update_orders
    return unless saved_change_to_order?

    complexes = ListingComplex.with_order_above(order)
    complexes.each do |complex|
      complex.update(order: complex.order + 1) if complex != self && ListingComplex.where(order: complex.order).count > 1
    end
  end

  private

  def should_generate_new_friendly_id?
    slug.blank? || name_changed?
  end
end

# == Schema Information
#
# Table name: listing_complexes
#
#  id          :bigint           not null, primary key
#  description :text
#  final_text  :text
#  hidden      :boolean          default(FALSE)
#  name        :string
#  new_format  :boolean          default(FALSE)
#  order       :integer
#  slug        :string
#  subtext     :text
#  url         :string
#  video_link  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  tenant_id   :bigint
#
# Indexes
#
#  index_listing_complexes_on_slug       (slug) UNIQUE
#  index_listing_complexes_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
