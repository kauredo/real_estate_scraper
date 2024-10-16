# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.3'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '7.0.4'

# Dotenv
gem 'dotenv-rails'

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'sprockets-rails'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.4'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 5.6'

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem 'jsbundling-rails'

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem 'turbo-rails'

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails'

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem 'cssbundling-rails'

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'

# Use Redis adapter to run Action Cable in production
gem 'redis'

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Other gems here
gem 'carrierwave'
gem 'cloudinary'
gem 'devise'
gem 'devise-jwt'
gem 'friendly_id'
gem 'friendly_id-mobility'
gem 'humanize'
gem 'i18n-js'
gem 'js-routes'
gem 'jwt'
gem 'listen', '~> 3.7', '>= 3.7.1'
gem 'mobility', '~> 1.2.9'
gem 'pagy', '~> 5.10'
gem 'paranoia'
gem 'rack-cors'
gem 'rails-controller-testing'
gem 'rails-i18n'
gem 'react-rails'
gem 'rubocop', require: false
gem 'rubocop-rails', require: false
gem 'sentry-rails'
gem 'sentry-ruby'
gem 'sentry-sidekiq'
gem 'sidekiq'
gem 'sidekiq-scheduler'
gem 'tinymce-rails'
gem 'watir'

# Tests / Scrape
gem 'selenium-webdriver'
gem 'simplecov', require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'pry'
  gem 'pry-byebug'
end

group :development do
  gem 'dockerfile-rails', '>= 1.2'
  gem 'erb_lint', require: false
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'web-console'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
end
