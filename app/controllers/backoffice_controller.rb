class BackofficeController < ApplicationController
  layout 'backoffice'
  before_action :authenticate_admin!
  before_action :redirect_if_not_confirmed!

  private

  def redirect_if_not_confirmed!
    redirect_to root_path if !current_admin.confirmed?
  end
end