class ListingComplex < ApplicationRecord
  has_many :listings, dependent: :destroy
end
