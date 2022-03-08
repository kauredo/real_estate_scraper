class Backoffice::PagesController < BackofficeController
  def home
    @variables = Variable.all
    @subs = NewsletterSubscription.all
  end
end
