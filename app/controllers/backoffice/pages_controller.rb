class Backoffice::PagesController < BackofficeController
  def home
    @variables = Variable.all
  end
end
