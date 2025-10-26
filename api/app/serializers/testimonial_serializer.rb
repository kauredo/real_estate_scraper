# frozen_string_literal: true

class TestimonialSerializer < ActiveModel::Serializer
  attributes :id, :name, :text, :created_at, :updated_at

  delegate :name, to: :object
  delegate :text, to: :object
end

# == Schema Information
#
# Table name: testimonials
#
#  id         :bigint           not null, primary key
#  name       :string
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tenant_id  :bigint
#
# Indexes
#
#  index_testimonials_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
