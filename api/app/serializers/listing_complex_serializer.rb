# frozen_string_literal: true

class ListingComplexSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :subtext, :final_text, :order,
             :url, :video_link, :new_format, :hidden, :created_at, :updated_at,
             :main_photo, :main_photo_thumb, :main_photo_medium, :thumbnail_url, :listing_prices

  has_many :photos, serializer: PhotoSerializer
  has_many :listings, serializer: ListingSerializer, if: :include_listings?

  delegate :name, to: :object
  delegate :slug, to: :object
  delegate :description, to: :object
  delegate :subtext, to: :object
  delegate :final_text, to: :object
  delegate :order, to: :object
  delegate :url, to: :object
  delegate :video_link, to: :object
  delegate :new_format, to: :object
  delegate :hidden, to: :object
  delegate :listing_prices, to: :object

  def main_photo
    object.main_photo&.image&.url
  end

  def main_photo_thumb
    object.main_photo&.image&.thumb&.url
  rescue StandardError
    main_photo
  end

  def main_photo_medium
    object.main_photo&.image&.medium&.url
  rescue StandardError
    main_photo
  end

  def thumbnail_url
    main_photo_thumb
  end

  def include_listings?
    @instance_options[:include_listings]
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
