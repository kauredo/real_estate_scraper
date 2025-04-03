module Backoffice
  class SocialMediaPostsController < BackofficeController
    before_action :set_partner

    def create
      @social_media_post = @partner.social_media_posts.build(social_media_post_params)

      if @social_media_post.save
        redirect_to edit_backoffice_partner_path(@partner), notice: 'Social media post was successfully added.'
      else
        flash[:alert] = @social_media_post.errors.full_messages.join(', ')
        redirect_to edit_backoffice_partner_path(@partner)
      end
    end

    def destroy
      @social_media_post = @partner.social_media_posts.find(params[:id])
      @social_media_post.destroy
      redirect_to edit_backoffice_partner_path(@partner), notice: 'Social media post was successfully deleted.'
    end

    private

    def set_partner
      @partner = Partner.find(params[:partner_id])
    end

    def social_media_post_params
      params.require(:social_media_post).permit(:url)
    end
  end
end
