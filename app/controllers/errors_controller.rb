# frozen_string_literal: true

class ErrorsController < ApplicationController
  layout 'error'

  def show
    if Rails.env.development? && params[:id].present?
      @status_code = params[:id].to_i
    else
      @exception = request.env['action_dispatch.exception']
      @status_code = @exception.try(:status_code) ||
                     ActionDispatch::ExceptionWrapper.new(
                       request.env, @exception
                     ).status_code
    end

    render view_for_code(@status_code), status: @status_code
  end

  private

  def view_for_code(code)
    supported_error_codes.fetch(code, '404')
  end

  def supported_error_codes
    {
      404 => '404',
      500 => '500'
    }
  end
end
