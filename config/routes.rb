Rails.application.routes.draw do
  devise_scope :admin do
    # Redirests signing out users back to sign-in
    get "admins", to: "devise/sessions#new"
  end

  devise_for :admins
  # resources :listings, only: [:show]
  # resources :listing_complexes, only: [:show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home"
  get "/sobre", to: "pages#about", as: :about
  get "/servicos", to: "pages#services", as: :services
  get "/casa_360", to: "pages#house_360", as: :house_360
  get "/contactos", to: "pages#contact", as: :contact
  post "/novo_contacto", to: "pages#new_contact", as: :new_contact
  get "/empreendimentos", to: "listing_complexes#index", as: :latest
  get '/empreendimentos/:id', to: 'listing_complexes#show', as: :listing_complex
  get "/comprar", to: "listings#buy", as: :buy
  get '/comprar/:id', to: 'listings#show', as: :listing
  get "/vender", to: "listings#sell", as: :sell
  resources :newsletter_subscriptions, only: [:create, :destroy] do
    member do
      get '/confirm', to: "newsletter_subscriptions#confirm"
    end
  end

  namespace :backoffice do
    get '/', to: "pages#home"
    resources :variables, only: [:create, :update, :destroy]
    resources :colleagues, only: [:show, :create, :update, :destroy]
    resources :listings, only: [:index, :edit, :update, :destroy]
    resources :listing_complexes
    resources :testimonials
  end
end
