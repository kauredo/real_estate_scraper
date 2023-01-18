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
      @testimonial.update(testimonial_params)
      redirect_to backoffice_testimonials_path
    end

    def destroy
      @testimonial.destroy
      redirect_to backoffice_testimonials_path
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
