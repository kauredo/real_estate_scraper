# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.3'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails'

# Dotenv
gem 'dotenv-rails'

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'sprockets-rails'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.4'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma'

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
gem 'acts_as_paranoid'
gem 'carrierwave', '~> 3.0'
gem 'cloudinary', '~> 1.28'
gem 'devise'
gem 'friendly_id'
gem 'friendly_id-mobility'
gem 'good_job'
gem 'humanize'
gem 'i18n-js'
gem 'js-routes'
gem 'jwt'
gem 'listen', '~> 3.7', '>= 3.7.1'
gem 'mobility', '~> 1.2.9'
gem 'mobility-ransack', '~> 1.2.2'
gem 'money-rails', '~> 1.12'
gem 'pagy', '~> 5.10'
gem 'rails-controller-testing'
gem 'rails-i18n'
gem 'ransack'
gem 'react-rails'
gem 'rubocop', require: false
gem 'rubocop-rails', require: false
gem 'sentry-rails'
gem 'sentry-ruby'
gem 'tinymce-rails'
gem 'watir'

gem 'execjs'
gem 'flipper'
gem 'flipper-active_record'
gem 'flipper-ui'

# Tests / Scrape
gem 'selenium-webdriver'
gem 'simplecov', require: false

group :development, :test do
  gem 'bullet'
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'pry'
  gem 'pry-byebug'
end

group :development do
  gem 'annotate'
  gem 'dockerfile-rails', '>= 1.2'
  gem 'erb_lint', require: false
  gem 'fabrication'
  gem 'faker'
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'web-console'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
end

gem "sib-api-v3-sdk", "~> 9.1"
