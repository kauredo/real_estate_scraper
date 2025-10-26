# Multi-Frontend Architecture

## API Design for Multiple Frontends

### 1. API Namespace Structure

```
https://your-railway-app.railway.app/
├── api/
│   ├── v1/
│   │   ├── listings/
│   │   ├── properties/
│   │   └── auth/
│   └── admin/
│       ├── listings/
│       └── users/
```

### 2. Frontend-Specific Configurations

#### Add to Rails routes.rb:

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :listings
      resources :properties

      # Auth endpoints
      post 'auth/login'
      delete 'auth/logout'
      get 'auth/me'
    end

    # Admin endpoints
    namespace :admin do
      resources :listings do
        member do
          patch :approve
          patch :reject
        end
      end
    end
  end
end
```

### 3. CORS Configuration per Frontend

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # Step-mother's real estate site
  allow do
    origins 'stepmother-realestate.vercel.app', 'custom-domain.com'
    resource '/api/v1/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end

  # Future client frontends
  allow do
    origins 'client2-site.vercel.app'
    resource '/api/v1/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end

  # Development
  allow do
    origins 'localhost:5173', '127.0.0.1:5173'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
```

### 4. Future Frontend Setup Process

For each new client:

1. **Client creates their own Vercel account** ($20/month)
2. **You provide them with**:
   - Frontend code template
   - API documentation
   - Environment variables
3. **You update CORS** to allow their domain
4. **Each client manages their own frontend billing**

### 5. API Documentation

Create API docs that you can share:

- Endpoint documentation
- Authentication flow
- Response formats
- Rate limiting info

This way each client can deploy their own frontend while using your shared API infrastructure.
