class Colleague < ApplicationRecord
  after_create :set_name
  has_many :listings, dependent: :destroy

  def set_name
    self.update(name: Rack::Utils.parse_nested_query(url)["agentName"])
  end
end