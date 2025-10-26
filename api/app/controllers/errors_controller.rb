# frozen_string_literal: true

class ErrorsController < ApplicationController
  def show
    if (Rails.env.development? || Rails.env.test?) && params[:id].present?
      @status_code = params[:id].to_i
    else
      @exception = request.env['action_dispatch.exception']
      @status_code = @exception.try(:status_code) ||
                     ActionDispatch::ExceptionWrapper.new(
                       request.env, @exception
                     ).status_code
    end

    error_info = error_info_for_code(@status_code)
    render json: {
      error: {
        code: @status_code,
        message: error_info[:message],
        type: error_info[:type]
      }
    }, status: @status_code
  end

  private

  def error_info_for_code(code)
    supported_error_codes.fetch(code, { message: 'Not Found', type: 'not_found' })
  end

  def supported_error_codes
    {
      404 => { message: 'Not Found', type: 'not_found' },
      500 => { message: 'Internal Server Error', type: 'internal_server_error' },
      422 => { message: 'Unprocessable Entity', type: 'unprocessable_entity' },
      400 => { message: 'Bad Request', type: 'bad_request' },
      401 => { message: 'Unauthorized', type: 'unauthorized' },
      403 => { message: 'Forbidden', type: 'forbidden' }
    }
  end
end
