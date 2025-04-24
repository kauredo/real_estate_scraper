# frozen_string_literal: true

require 'test_helper'

class AdminTest < ActiveSupport::TestCase
  def setup
    @admin = Admin.new(email: 'test@admin.com', password: 'password')
  end

  test 'should be valid' do
    assert @admin.valid?
  end

  test 'email should be present' do
    @admin.email = ' '
    assert_not @admin.valid?
  end

  test 'password should be present' do
    @admin.password = ' '
    assert_not @admin.valid?
  end

  test 'email should be unique' do
    duplicate_admin = @admin.dup
    duplicate_admin.email = @admin.email.upcase
    @admin.save
    assert_not duplicate_admin.valid?
  end
end

# == Schema Information
#
# Table name: admins
#
#  id                     :bigint           not null, primary key
#  confirmed              :boolean          default(FALSE)
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_admins_on_email                 (email) UNIQUE
#  index_admins_on_jti                   (jti) UNIQUE
#  index_admins_on_reset_password_token  (reset_password_token) UNIQUE
#
