class Backoffice::TestimonialsController < BackofficeController
 before_action :find_testimonial, except: [:index, :new, :create]

  def index
    @testimonials = Testimonial.all
  end

  def new
    @testimonial = Testimonial.new
  end

  def create
    @testimonial = Testimonial.new(testimonial_params)
    if @testimonial.save
      redirect_to backoffice_testimonials_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    @testimonial.update(testimonial_params)
    redirect_to backoffice_testimonials_path
  end

  def destroy
    @testimonial.destroy
  end

  private

  def find_testimonial
    @testimonial = Testimonial.find(params[:id])
  end

  def testimonial_params
    params.require(:testimonial).permit(:name, :text)
  end
end
