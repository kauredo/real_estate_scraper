# frozen_string_literal: true

Rails.application.routes.draw do
  match '(*any)', to: redirect(subdomain: ''), via: :all, constraints: { subdomain: 'www' }
  post '/toggle_dark_mode', to: 'application#toggle_dark_mode'

  scope '(:locale)', locale: /#{I18n.available_locales.join("|")}/ do
    devise_scope :admin do
      # Redirests signing out users back to sign-in
      get 'admins', to: 'devise/sessions#new'
    end

    devise_for :admins
    # resources :listings, only: [:show]
    # resources :listing_complexes, only: [:show]
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Defines the root path route ("/")
    root 'pages#home'
    get '/servicos', to: 'pages#services', as: :services
    get '/kw', to: 'pages#about', as: :about
    get '/privacidade', to: 'pages#privacy', as: :privacy
    get '/termos_e_condicoes', to: 'pages#terms_and_conditions', as: :terms_and_conditions
    get '/contactos', to: 'pages#contact', as: :contact
    get '/faq', to: 'pages#faq', as: :faq
    post '/novo_contacto', to: 'pages#new_contact', as: :new_contact
    get '/empreendimentos', to: 'listing_complexes#index', as: :latest
    get '/empreendimentos/:id', to: 'listing_complexes#show', as: :listing_complex
    get '/comprar', to: 'listings#buy', as: :buy
    get '/comprar/:id', to: 'listings#show', as: :listing
    get '/blog', to: 'blog_posts#index', as: :blog
    get '/blog/:id', to: 'blog_posts#show', as: :blog_post
    get '/vender', to: 'listings#sell', as: :sell
    post '/tinymce_assets' => 'blog_photos#create'

    # Club SGG routes
    get '/clube-sgg', to: 'club#index', as: :club
    get '/clube-sgg/parceiros-sociais', to: 'club#social_partners', as: :club_social_partners
    get '/clube-sgg/regulamento', to: 'club#rules', as: :club_rules
    get '/clube-sgg/historias', to: 'club_stories#index', as: :club_stories
    get '/clube-sgg/historias/:id', to: 'club_stories#show', as: :club_story

    resources :blog_photos, only: %i[create destroy]
    resources :photos, only: [:destroy]
    resources :newsletter_subscriptions, only: %i[create destroy] do
      member do
        get '/confirm', to: 'newsletter_subscriptions#confirm'
      end
    end

    resources :club_story_photos, only: %i[create destroy]

    # redirect from /about to /kw
    get '/about', to: redirect('/kw')
    get '/sobre', to: redirect('/kw')

    namespace :backoffice do
      get '/', to: 'pages#home'
      resources :variables, only: %i[create update destroy]
      resources :blog_posts
      resources :club_stories
      resources :partners do
        resources :social_media_posts, only: %i[create destroy]
      end
      resources :listings, only: %i[index create edit update destroy] do
        member do
          post :update_details
          post :recover
        end
        collection do
          post :update_all
        end
      end
      resources :listing_complexes do
        member do
          post :update_details
          patch :photos
          delete :delete_photo
        end
        collection do
          post :fetch
        end
      end

      resources :testimonials
    end

    resources :errors, only: 'show' if Rails.env.development? || Rails.env.test?
  end

  authenticate :admin, ->(a) { a.confirmed? } do
    mount GoodJob::Engine => '/good_job'
  end

  get '/sitemap', to: 'testsuite#sitemap'
end
