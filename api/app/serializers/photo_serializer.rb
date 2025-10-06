# frozen_string_literal: true

class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :main, :order, :original_url, :listing_complex_id, :created_at, :updated_at

  delegate :image, to: :object
  delegate :main, to: :object
  delegate :order, to: :object
  delegate :original_url, to: :object
  delegate :listing_complex_id, to: :object

  belongs_to :listing_complex
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
#  index_photos_on_listing_complex_id  (listing_complex_id)
#  index_photos_on_original_url        (original_url) UNIQUE WHERE (original_url IS NOT NULL)
#  index_photos_on_tenant_id           (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
