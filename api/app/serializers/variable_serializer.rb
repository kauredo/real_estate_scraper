# frozen_string_literal: true

class VariableSerializer
  def initialize(variable)
    @variable = variable
  end

  def as_json
    {
      id: @variable.id,
      name: @variable.name,
      value: @variable.value,
      icon: @variable.icon,
      created_at: @variable.created_at,
      updated_at: @variable.updated_at
    }
  end
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
