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
