# frozen_string_literal: true

class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :confirmed, :created_at, :updated_at

  delegate :email, to: :object
  delegate :confirmed, to: :object
end

# == Schema Information
#
# Table name: admins
#
#  id                     :bigint           not null, primary key
#  confirmed              :boolean          default(FALSE)
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_admins_on_email                 (email) UNIQUE
#  index_admins_on_reset_password_token  (reset_password_token) UNIQUE
#
