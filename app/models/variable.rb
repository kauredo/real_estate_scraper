# frozen_string_literal: true

class Variable < ApplicationRecord
  validates :name, presence: { message: 'não pode estar vazio' }
  validates :value, presence: { message: 'não pode estar vazio' }
  validates :icon, presence: { message: 'não pode estar vazio' }

  def self.volume
    where('name LIKE ?', '%volume%')&.first&.value || 0
  end
end
