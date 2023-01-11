# frozen_string_literal: true

module Backoffice
  class VariablesController < BackofficeController
    before_action :find_variable, except: [:create]

    def create
      Variable.create(variable_params)
      flash[:notice] = 'Variável criada'
      redirect_to backoffice_path({ locale: I18n.locale })
    end

    def update
      @variable.update(variable_params)
      flash[:notice] = 'Variável atualizada'
      redirect_to backoffice_path({ locale: I18n.locale })
    end

    def destroy
      @variable.destroy
      flash[:notice] = 'Variável apagada'
      redirect_to backoffice_path({ locale: I18n.locale })
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
