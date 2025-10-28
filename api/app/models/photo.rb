# frozen_string_literal: true

class Photo < ApplicationRecord
  include ActsAsTenant
  mount_uploader :image, ImageUploader
  belongs_to :listing_complex
  after_create :update_main
  after_save :update_orders
  after_save :update_main
  validates :main, inclusion: [true, false]
  validates :original_url, uniqueness: true, allow_nil: true

  default_scope { sort_order }
  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :sort_order, lambda {
    where.not(order: nil).order(:order)
  }

  def update_main
    return unless saved_change_to_main?

    photos = Photo.unscoped.where(listing_complex_id:).where.not(id:)
    photos.update_all(main: false)
  end

  def update_orders
    return unless saved_change_to_order?

    existing_photos = Photo.where(listing_complex_id:).with_order_above(order)
    existing_photos.each do |photo|
      photo.update(order: photo.order + 1) if photo != self && Photo.where(order: photo.order).count > 1
    end

    photos = Photo.unscoped.where(listing_complex_id:).where(order: nil)
    order = existing_photos.pluck(:order).max || 0
    photos.each do |photo|
      photo.update(order: order + 1)
      order += 1
    end
  end
end

# == Schema Information
#
# Table name: photos
#
#  id                 :bigint           not null, primary key
#  image              :text
#  main               :boolean          default(FALSE)
#  order              :integer
#  original_url       :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  listing_complex_id :bigint
#  tenant_id          :bigint
#
# Indexes
#
#  index_photos_on_complex_main        (listing_complex_id,main) WHERE (main = true)
#  index_photos_on_listing_complex_id  (listing_complex_id)
#  index_photos_on_original_url        (original_url) UNIQUE WHERE (original_url IS NOT NULL)
#  index_photos_on_tenant_id           (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
