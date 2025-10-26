# frozen_string_literal: true

class VariableSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :icon, :created_at, :updated_at

  delegate :name, to: :object
  delegate :value, to: :object
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
