# frozen_string_literal: true

module Backoffice
  class VariablesController < BackofficeController
    before_action :find_variable, except: [:create]

    def create
      var = Variable.new(variable_params)
      if var.save
        flash[:notice] = 'Variável criada'
      else
        flash[:error] = var.errors.full_messages.join('. ')
      end
      redirect_to backoffice_path
    end

    def update
      @variable.update(variable_params)
      flash[:notice] = 'Variável atualizada'
      redirect_to backoffice_path
    end

    def destroy
      @variable.destroy
      flash[:notice] = 'Variável apagada'
      redirect_to backoffice_path
    end

    private

    def find_variable
      @variable = Variable.find(params[:id])
    end

    def variable_params
      params.require(:variable).permit(:name, :value, :icon)
    end
  end
end
