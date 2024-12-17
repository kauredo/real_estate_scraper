# frozen_string_literal: true

class Variable < ApplicationRecord
  extend Mobility
  translates :name, :value

  has_one :translation, class_name: 'Variable::Translation', dependent: :destroy

  validates :name, presence: { message: 'não pode estar vazio' }
  validates :value, presence: { message: 'não pode estar vazio' }
  validates :icon, presence: { message: 'não pode estar vazio' }

  default_scope { includes(:translations) }
end

# == Schema Information
#
# Table name: variables
#
#  id         :bigint           not null, primary key
#  icon       :string
#  name       :string
#  value      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
