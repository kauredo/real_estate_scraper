# frozen_string_literal: true

class Variable < ApplicationRecord
  include ActsAsTenant
  extend Mobility
  translates :name, :value

  has_one :translation, class_name: 'Variable::Translation', dependent: :destroy

  validates :name, presence: { message: 'não pode estar vazio' }
  validates :value, presence: { message: 'não pode estar vazio' }
  validates :icon, presence: { message: 'não pode estar vazio' }
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
#  tenant_id  :bigint
#
# Indexes
#
#  index_variables_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
