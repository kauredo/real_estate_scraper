class Listing < ApplicationRecord
  belongs_to :colleague

  scope :latest, -> { where(status: "Novo") }
  scope :by_city, -> { all.group_by { |l| l.city }.sort_by{|city, _stuff| city }.to_h }

  def city
    address.split(',').last.squish
  end
end
