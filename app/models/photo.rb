class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :listing_complex
  after_save :update_orders
  after_save :update_main
  after_create :update_main

  default_scope { sort_order }
  scope :with_order_above, ->(new_order) { where.not(order: nil).where(order: new_order..) }
  scope :sort_order, lambda {
    where.not(order: nil).order(:order)
  }

  def update_main
    return unless saved_change_to_main?

    photos = Photo.where(listing_complex_id:).where.not(id:)
    photos.update_all(main: false)
  end

  def update_orders
    return unless saved_change_to_order?

    existing_photos = Photo.where(listing_complex_id:).with_order_above(order)
    existing_photos.each do |photo|
      photo.update(order: photo.order + 1) if photo != self && Photo.where(order: photo.order).count > 1
    end

    photos = Photo.unscoped.where(listing_complex_id:).where(order: nil)
    order = existing_photos.map(&:order).max || 0
    photos.each do |photo|
      photo.update(order: order + 1)
      order += 1
    end
  end
end
