# frozen_string_literal: true

require 'test_helper'

module Backoffice
  class VariablesControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @variable = variables(:one)
      @admin = admins(:one)
      sign_in @admin
    end

    test 'should create variable' do
      assert_difference('Variable.count') do
        post backoffice_variables_path, params: { variable: { name: 'New Variable', value: 'New Value', icon: 'fa fa-star' } }
      end

      assert_redirected_to backoffice_path
      assert_equal 'Variável criada', flash[:notice]
    end

    test 'should update variable' do
      patch backoffice_variable_path(@variable, locale: I18n.locale), params: { variable: { name: 'Updated Variable', value: 'Updated Value', icon: 'fa fa-heart' } }

      assert_redirected_to backoffice_path
      assert_equal 'Variável atualizada', flash[:notice]

      @variable.reload
      assert_equal 'Updated Variable', @variable.name
      assert_equal 'Updated Value', @variable.value
      assert_equal 'fa fa-heart', @variable.icon
    end

    test 'should destroy variable' do
      assert_difference('Variable.count', -1) do
        delete backoffice_variable_path(@variable, locale: I18n.locale)
      end

      assert_redirected_to backoffice_path
      assert_equal 'Variável apagada', flash[:notice]
    end
  end
end
