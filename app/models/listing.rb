class Listing < ApplicationRecord
  acts_as_paranoid
  belongs_to :colleague, optional: true
  belongs_to :listing_complex, optional: true

  scope :newest, -> { where(status: "Novo") }
  scope :by_city, -> { all.group_by { |l| l.city }.sort_by{|city, _stuff| city }.to_h }

  def city
    address.split(',').last.squish
  end
end
