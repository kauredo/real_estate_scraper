# frozen_string_literal: true

class ClubUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :phone, :status, :terms_accepted, :created_at, :updated_at

  delegate :email, to: :object
  delegate :name, to: :object
  delegate :phone, to: :object
  delegate :status, to: :object
  delegate :terms_accepted, to: :object
end
