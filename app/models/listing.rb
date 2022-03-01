class Listing < ApplicationRecord
  scope :latest, -> { where(status: "Novo") }
end
