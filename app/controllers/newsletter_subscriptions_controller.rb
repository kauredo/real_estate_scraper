class NewsletterSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_or_initialize_by(email: email_params[:email])
    @user.name = email_params[:name]

    if @user.save
      sub = NewsletterSubscription.find_or_create_by(user: @user)
      if @user.confirmed_email
        flash[:notice] = "Já tem uma subscrição ativa à nossa newsletter. Obrigada pela confiança!"
      else
        NewsletterConfirmationMailer.with(user: @user).subscription_confirmed.deliver_later
        flash[:notice] = "Por favor confirme a subscrição através do seu email"
      end

      redirect_to(root_path)
    else
      flash[:error] = @user.errors.full_messages.to_sentence
      redirect_to(root_path)
    end
  end

  def confirm
    sub = NewsletterSubscription.find(params[:id])
    decrypted_token = JsonWebToken.decode(params[:token])

    if decrypted_token[:user_id] = sub.user_id && Time.zone.now < Time.at(decrypted_token[:exp])
      sub.user.update(confirmed_email: true)
      flash[:notice] = "Subscrição à newsletter ativa, obrigado pela confiança"
    else
      flash[:error] = "Não foi possível subscrever à newsletter, por favor tente novamente"
    end

    redirect_to(root_path)
  end

  def destroy
    # TODO
  end

  private

  def email_params
    params.require(:newsletter).permit(:email, :name, :token)
  end
end
