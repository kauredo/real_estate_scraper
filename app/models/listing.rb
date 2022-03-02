class Listing < ApplicationRecord
  scope :latest, -> { where(status: "Novo") }
  scope :by_city, -> { all.group_by { |l| l.city } }

  def city
    address.split(',').last.squish
  end
end
