# frozen_string_literal: true

Rails.application.routes.draw do
  # API routes
  namespace :api do
    namespace :v1 do
      # API Documentation
      get '/docs', to: 'docs#index'

      # Authentication
      post '/auth/login', to: 'auth#login'
      delete '/auth/logout', to: 'auth#logout'
      post '/toggle_dark_mode', to: 'base#toggle_dark_mode'

      # Admin API endpoints
      namespace :admin do
        resources :blog_posts
        resources :club_stories
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
        resources :listings, only: %i[index create show update destroy] do
          member do
            post :update_details
            post :recover
          end
          collection do
            post :update_all
          end
        end
        resources :testimonials
        resources :variables, only: %i[index create update destroy]
        resources :photos, only: %i[index destroy]
        resources :blog_photos, only: %i[create destroy]
        resources :club_story_photos, only: %i[create destroy]
        resources :club_users, only: [:index]
        get 'export_club_users', to: 'club_users#export'
        resources :newsletter_subscriptions, only: [:index]
      end

      resources :listings, only: %i[index show]
      resources :listing_complexes, only: %i[index show]
      resources :blog_posts, only: %i[index show]
      resources :club_stories, only: %i[index show]
      resources :testimonials, only: [:index]
      resources :variables, only: [:index]

      post '/contact', to: 'pages#contact'
      post '/club/join', to: 'club#join'
      post '/newsletter_subscriptions', to: 'newsletter_subscriptions#create'
      get '/newsletter_subscriptions/:id/confirm', to: 'newsletter_subscriptions#confirm'

      get '/home', to: 'pages#home'
      get '/about', to: 'pages#about'
      get '/services', to: 'pages#services'
      get '/contact', to: 'pages#contact_page'
      get '/privacy', to: 'pages#privacy'
      get '/terms_and_conditions', to: 'pages#terms_and_conditions'
      get '/faq', to: 'pages#faq'
      get '/buy', to: 'listings#buy'
      get '/sell', to: 'listings#sell'
      get '/club', to: 'club#index'
      get '/club/rules', to: 'club#rules'

      # Sitemap
      get '/sitemap', to: 'sitemap#index', defaults: { format: 'xml' }
    end
  end

  # Sitemap at root level (for SEO tools that expect it at /sitemap.xml)
  get '/sitemap.xml', to: redirect('/api/v1/sitemap.xml')

  # Redirect root to API documentation
  root to: redirect('/api/v1/docs')
end
