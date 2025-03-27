# frozen_string_literal: true

class Partner < ApplicationRecord
  has_many :social_media_posts, dependent: :destroy
  validates :name, presence: true
end

# == Schema Information
#
# Table name: partners
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
