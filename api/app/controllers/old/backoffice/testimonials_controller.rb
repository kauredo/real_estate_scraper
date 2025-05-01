# frozen_string_literal: true

module Backoffice
  class TestimonialsController < BackofficeController
    before_action :find_testimonial, except: %i[index new create]

    def index
      @testimonials = Testimonial.all
    end

    def new
      @testimonial = Testimonial.new
    end

    def create
      @testimonial = Testimonial.new(testimonial_params)
      if @testimonial.save
        flash[:notice] = 'Testemunho criado'
        redirect_to backoffice_testimonials_path
      else
        flash.now[:error] = @testimonial.errors.full_messages.join('. ')
        render :new
      end
    end

    def edit; end

    def update
      if @testimonial.update(testimonial_params)
        flash[:notice] = 'Testemunho atualizado'
        redirect_to backoffice_testimonials_path
      else
        flash.now[:error] = @testimonial.errors.full_messages.join('. ')
        render :edit
      end
    end

    def destroy
      @testimonial.destroy
      redirect_to backoffice_testimonials_path, status: :see_other
    end

    private

    def find_testimonial
      @testimonial = Testimonial.find(params[:id])
    end

    def testimonial_params
      params.require(:testimonial).permit(:name, :text)
    end
  end
end
