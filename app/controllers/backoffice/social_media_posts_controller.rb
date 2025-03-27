module Backoffice
  class SocialMediaPostsController < BackofficeController
    before_action :set_partner

    def create
      @post = @partner.social_media_posts.build(post_params)
      if @post.save
        redirect_to edit_backoffice_partner_path(@partner), notice: 'Post was successfully added.'
      else
        redirect_to edit_backoffice_partner_path(@partner), alert: 'Failed to add post.'
      end
    end

    def destroy
      @post = @partner.social_media_posts.find(params[:id])
      @post.destroy
      redirect_to edit_backoffice_partner_path(@partner), notice: 'Post was successfully removed.'
    end

    private

    def set_partner
      @partner = Partner.find(params[:partner_id])
    end

    def post_params
      params.require(:social_media_post).permit(:url)
    end
  end
end
