class NewsletterSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_or_initialize_by(email: email_params[:email])
    @user.name = email_params[:name]

    if @user.save
      if NewsletterSubscription.where(user_id: @user.id).empty?
        NewsletterSubscription.create(user: @user) 
        NewsletterConfirmationMailer.with(user: @user).subscription_confirmed.deliver_later
      end

      flash[:notice] = "Por favor confirme a subscrição através do seu email"
      redirect_to(root_path)
    else
      flash[:error] = @user.errors.full_messages.to_sentence
      redirect_to(root_path)
    end
  end

  def confirm
    sub = NewsletterSubscription.find(params[:id])
    sub.user.update(confirmed_email: true)
    flash[:notice] = "Subscrição à newsletter ativa, obrigado pela confiança"
    redirect_to(root_path)
  end

  def destroy
    
  end

  private

  def email_params
    params.require(:newsletter).permit(:email, :name)
  end
end
