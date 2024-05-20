# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  match '(*any)', to: redirect(subdomain: ''), via: :all, constraints: { subdomain: 'www' }

  namespace :api do
    namespace :v1 do
      devise_for :admins, controllers: {
        sessions: 'api/v1/admins/sessions',
        registrations: 'api/v1/admins/registrations',
        confirmations: 'api/v1/admins/confirmations',
        passwords: 'api/v1/admins/passwords',
        unlocks: 'api/v1/admins/unlocks'
      }
      resources :listings do
        collection do
          get '/by_geography', to: 'listings#by_geography'
        end
      end
      resources :photos
      resources :results
      resources :testimonials

      resources :blog_photos
      resources :listing_complexes
      resources :blog_posts
      resources :newsletter_subscriptions

      namespace :backoffice do
        resources :blog_posts, only: %i[index show create update destroy]
        resources :variables, only: %i[index create update destroy]
        resources :testimonials, only: %i[create update destroy]
        resources :newsletter_subscriptions, only: %i[index]
        resources :listings, only: %i[index create update destroy] do
          member do
            post '/update_details', to: 'listings#update_details'
          end
          collection do
            post '/update_all', to: 'listings#update_all'
          end
        end
        resources :listing_complexes, only: %i[index create update destroy] do
          patch 'photos'
          delete 'delete_photo'
        end
      end
    end
  end

  scope '(:locale)', locale: /#{I18n.available_locales.join("|")}/ do
    post '/novo_contacto', to: 'pages#new_contact', as: :new_contact
    post '/tinymce_assets' => 'blog_photos#create'
    resources :blog_photos, only: %i[create destroy]
    resources :photos, only: [:destroy]
    resources :newsletter_subscriptions, only: %i[create destroy] do
      member do
        get '/confirm', to: 'newsletter_subscriptions#confirm'
      end
    end
  end

  mount Sidekiq::Web => '/sidekiq'

  get '/sitemap', to: 'testsuite#sitemap'
end
