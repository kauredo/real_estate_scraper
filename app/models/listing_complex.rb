class ListingComplex < ApplicationRecord
  has_many :listings, dependent: :destroy

  default_scope { order(order: :asc) }
end
