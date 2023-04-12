# frozen_string_literal: true

require 'test_helper'

class TestVariable < ActiveSupport::TestCase
  def setup
    @variable = variables(:one)
  end

  test 'should be valid' do
    assert @variable.valid?
  end

  test 'name should be present' do
    @variable.name = ' '
    assert_not @variable.valid?
  end

  test 'value should be present' do
    @variable.value = ' '
    assert_not @variable.valid?
  end

  test 'icon should be present' do
    @variable.icon = ' '
    assert_not @variable.valid?
  end
end
