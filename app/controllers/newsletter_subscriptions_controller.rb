class NewsletterSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_or_initialize_by(email: email_params[:email])

    if @user.save
      NewsletterSubscription.create(user: @user) if NewsletterSubscription.where(user_id: @user.id).empty?
      flash[:notice] = "Nice"
      redirect_to(root_path)
    else
      flash[:error] = @user.errors.full_messages.to_sentence
      redirect_to(root_path)
    end
  end

  def destroy
    
  end

  private

  def email_params
    params.require(:newsletter).permit(:email)
  end
end
