# frozen_string_literal: true

module Backoffice
  class ColleaguesController < BackofficeController
    before_action :find_colleague, except: [:create]

    def show; end

    def create
      Colleague.create(colleague_params)
      flash[:notice] = 'Colega criado'
      redirect_to backoffice_path
    end

    def update
      @colleague.update(colleague_params)
      flash[:notice] = 'Colega atualizado'
      redirect_to backoffice_path
    end

    def destroy
      @colleague.destroy
      flash[:notice] = 'Colega apagado'
      redirect_to backoffice_path
    end

    private

    def find_colleague
      @colleague = Colleague.find(params[:id])
    end

    def colleague_params
      params.require(:colleague).permit(:url)
    end
  end
end
