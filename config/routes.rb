# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  match '(*any)', to: redirect(subdomain: ''), via: :all, constraints: { subdomain: 'www' }

  namespace :api do
    namespace :v1 do
      resources :listings do
        collection do
          get '/by_geography', to: 'listings#by_geography'
        end
      end
      resources :photos
      resources :results
      resources :testimonials

      resources :blog_photos
      resources :variables
      resources :listing_complexes
      resources :blog_posts
      resources :newsletter_subscriptions
    end
  end

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
    get '/sobre', to: 'pages#about', as: :about
    get '/servicos', to: 'pages#services', as: :services
    get '/casa_360', to: 'pages#house_360', as: :house_360
    get '/kw', to: 'pages#kw', as: :kw
    get '/privacidade', to: 'pages#privacy', as: :privacy
    get '/termos_e_condicoes', to: 'pages#terms_and_conditions', as: :terms_and_conditions
    get '/contactos', to: 'pages#contact', as: :contact
    post '/novo_contacto', to: 'pages#new_contact', as: :new_contact
    get '/empreendimentos', to: 'listing_complexes#index', as: :latest
    get '/empreendimentos/:id', to: 'listing_complexes#show', as: :listing_complex
    get '/comprar', to: 'listings#buy', as: :buy
    get '/comprar/:id', to: 'listings#show', as: :listing
    get '/blog', to: 'blog_posts#index', as: :blog
    get '/blog/:id', to: 'blog_posts#show', as: :blog_post
    get '/vender', to: 'listings#sell', as: :sell
    post '/tinymce_assets' => 'blog_photos#create'
    resources :blog_photos, only: %i[create destroy]
    resources :photos, only: [:destroy]
    resources :newsletter_subscriptions, only: %i[create destroy] do
      member do
        get '/confirm', to: 'newsletter_subscriptions#confirm'
      end
    end

    namespace :backoffice do
      get '/', to: 'pages#home'
      resources :variables, only: %i[create update destroy]
      resources :blog_posts
      resources :listings, only: %i[index create edit update destroy] do
        member do
          post '/update_details', to: 'listings#update_details'
        end
        collection do
          post '/update_all', to: 'listings#update_all'
        end
      end
      resources :listing_complexes do
        patch 'photos'
        delete 'delete_photo'
      end
      resources :testimonials
    end

    resources :errors, only: 'show' if [Rails.env.development? || Rails.env.test?]
  end

  authenticate :admin, ->(a) { a.confirmed? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get '/sitemap', to: 'testsuite#sitemap'
end
