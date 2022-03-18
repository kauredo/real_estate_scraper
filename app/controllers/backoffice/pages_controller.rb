class Backoffice::PagesController < BackofficeController
  def home
    @variables = Variable.all
    @colleagues = Colleague.all
    @subs = NewsletterSubscription.all
  end
end
