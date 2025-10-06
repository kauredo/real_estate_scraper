# frozen_string_literal: true

class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :description, :address, :price, :price_cents,
             :status, :objective, :kind, :features, :stats, :url, :video_link,
             :virtual_tour_url, :photos, :listing_complex_id, :city, :created_at,
             :updated_at

  belongs_to :listing_complex

  delegate :title, to: :object
  delegate :slug, to: :object
  delegate :description, to: :object
  delegate :address, to: :object
  delegate :price_cents, to: :object
  delegate :status, to: :object
  delegate :objective, to: :object
  delegate :kind, to: :object
  delegate :features, to: :object
  delegate :stats, to: :object
  delegate :url, to: :object
  delegate :video_link, to: :object
  delegate :virtual_tour_url, to: :object
  delegate :photos, to: :object
  delegate :listing_complex_id, to: :object
  delegate :city, to: :object

  def price
    object.price&.format(symbol: nil, no_cents_if_whole: true)
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
#  tenant_id          :bigint
#
# Indexes
#
#  index_listings_on_deleted_at                (deleted_at)
#  index_listings_on_listing_complex_id        (listing_complex_id)
#  index_listings_on_slug                      (slug) UNIQUE
#  index_listings_on_tenant_id                 (tenant_id)
#  index_listings_on_tenant_id_and_created_at  (tenant_id,created_at)
#  index_listings_on_tenant_id_and_status      (tenant_id,status)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
