module Backoffice
  class PartnersController < BackofficeController
    before_action :set_partner, only: %i[edit update destroy]

    def index
      @partners = Partner.all.includes(:social_media_posts)
    end

    def new
      @partner = Partner.new
    end

    def create
      @partner = Partner.new(partner_params)
      if @partner.save
        redirect_to backoffice_partners_path, notice: 'Partner was successfully created.'
      else
        render :new
      end
    end

    def edit; end

    def update
      if @partner.update(partner_params)
        redirect_to backoffice_partners_path, notice: 'Partner was successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @partner.destroy
      redirect_to backoffice_partners_path, notice: 'Partner was successfully deleted.'
    end

    private

    def set_partner
      @partner = Partner.find(params[:id])
    end

    def partner_params
      params.require(:partner).permit(:name)
    end
  end
end
