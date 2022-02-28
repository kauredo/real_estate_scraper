Rails.application.routes.draw do
  resources :listings, only: [:show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home"
  get "/sobre", to: "pages#about", as: :about
  get "/calculadora", to: "pages#calculator", as: :calculator
  get "/servicos", to: "pages#services", as: :services
  get "/casa_360", to: "pages#house_360", as: :house_360
  get "/contactos", to: "pages#contact", as: :contact
end
