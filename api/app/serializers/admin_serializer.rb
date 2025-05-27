# frozen_string_literal: true

class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :confirmed, :created_at, :updated_at

  delegate :email, to: :object
  delegate :confirmed, to: :object
end
