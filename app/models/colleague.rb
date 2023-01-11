# frozen_string_literal: true

class Colleague < ApplicationRecord
  after_create :set_name
  has_many :listings, dependent: :destroy

  def set_name
    update(name: Rack::Utils.parse_nested_query(url)['agentName'])
  end
end
