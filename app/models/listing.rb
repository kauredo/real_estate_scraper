class Listing < ApplicationRecord
  acts_as_paranoid
  belongs_to :colleague, optional: true
  belongs_to :listing_complex, optional: true

  default_scope { by_sofia.or(by_colleagues).order(colleague_id: :desc, created_at: :desc) }
  scope :by_sofia, -> { where(colleague: nil) }
  scope :by_colleagues, -> { where.not(colleague: nil) }
  scope :newest, -> { where(status: "Novo") }
  scope :by_city, -> { all.group_by { |l| l.city }.sort_by{|city, _stuff| city }.to_h }

  def city
    address.split(',').last.squish
  end
end
