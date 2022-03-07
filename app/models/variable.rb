class Variable < ApplicationRecord
  def self.volume
    where('name LIKE ?', '%volume%')&.first&.value || 0
  end
end
