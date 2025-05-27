# frozen_string_literal: true

class ClubUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :phone, :status, :terms_accepted, :created_at, :updated_at

  delegate :email, to: :object
  delegate :name, to: :object
  delegate :phone, to: :object
  delegate :status, to: :object
  delegate :terms_accepted, to: :object
end

# == Schema Information
#
# Table name: club_users
#
#  id             :bigint           not null, primary key
#  email          :string
#  name           :string
#  phone          :string
#  status         :integer
#  terms_accepted :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
