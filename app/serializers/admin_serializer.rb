# frozen_string_literal: true

class AdminSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :confirmed
end
