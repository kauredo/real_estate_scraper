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
