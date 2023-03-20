# frozen_string_literal: true

class Variable < ApplicationRecord
  extend Mobility
  translates :name, :value

  has_one :translation, class_name: 'Variable::Translation'

  validates :name, presence: { message: 'não pode estar vazio' }
  validates :value, presence: { message: 'não pode estar vazio' }
  validates :icon, presence: { message: 'não pode estar vazio' }

  default_scope { includes(:translation) }

  def self.volume
    where('name LIKE ?', '%volume%')&.first&.value || 0
  end
end
