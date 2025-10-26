# Super Admin & Unified Backoffice Architecture

## Overview

This document describes the architecture for:
1. **Super Admin** - System-level admin with access to all tenants
2. **Unified Backoffice/CMS** - Centralized admin panel for managing multiple tenants

## Problem Statement

Currently:
- Each tenant has their own admins (scoped to their data)
- No way to manage tenants themselves
- No centralized admin panel
- No cross-tenant analytics or reporting

**We need:**
- Super admin who can manage all tenants
- Unified admin interface (CMS) for super admins and tenant admins
- Modern, branded UI (not generic Rails admin)
- Easy tenant management and onboarding

## Architecture Overview

### Three-Tier Admin System

```
┌─────────────────────────────────────────────────────┐
│                  Super Admin                        │
│  - Manage all tenants                               │
│  - Create/disable tenants                           │
│  - View cross-tenant analytics                      │
│  - Manage feature flags                             │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                  Tenant Admin                       │
│  - Manage own tenant's data                         │
│  - CRUD listings, blog posts, etc.                  │
│  - View tenant-specific analytics                   │
│  - Cannot see other tenants                         │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                  End Users (Public)                 │
│  - View listings, blog posts                        │
│  - Submit contact forms                             │
│  - Subscribe to newsletter                          │
└─────────────────────────────────────────────────────┘
```

### System Components

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Public Frontend │       │  Admin Backoffice│       │   Rails API      │
│  (Tenant Sites)  │────→  │  (Unified CMS)   │────→  │   (Backend)      │
│  Vite + React    │       │  Vite + React    │       │   Rails 7        │
└──────────────────┘       └──────────────────┘       └──────────────────┘
     ↓ X-API-Key               ↓ X-Admin-Key              ↓ Database
     SGG Tenant                 Super Admin               PostgreSQL
```

## Part 1: Super Admin Implementation

### Database Changes

**Add `role` to admins table:**

```ruby
# db/migrate/XXXXXX_add_role_to_admins.rb
class AddRoleToAdmins < ActiveRecord::Migration[7.1]
  def change
    add_column :admins, :role, :integer, default: 0, null: false
    add_index :admins, :role
  end
end
```

**Update Admin model:**

```ruby
# app/models/admin.rb
class Admin < ApplicationRecord
  # Don't include ActsAsTenant for super admins
  belongs_to :tenant, optional: true  # Optional for super admins

  validates :tenant_id, presence: true, unless: :super_admin?

  # Roles
  enum role: { tenant_admin: 0, super_admin: 1 }

  # Validations
  validates :email, presence: true, uniqueness: true

  # Scopes
  scope :tenant_admins, -> { where(role: :tenant_admin) }
  scope :super_admins, -> { where(role: :super_admin) }

  def super_admin?
    role == 'super_admin'
  end

  def tenant_admin?
    role == 'tenant_admin'
  end

  # Super admins can access all tenants
  def accessible_tenants
    if super_admin?
      Tenant.all
    else
      Tenant.where(id: tenant_id)
    end
  end
end
```

### Super Admin Authorization

**Create authorization concern:**

```ruby
# app/controllers/concerns/super_admin_authorization.rb
module SuperAdminAuthorization
  extend ActiveSupport::Concern

  included do
    before_action :require_super_admin!
  end

  private

  def require_super_admin!
    authenticate_admin!

    unless current_admin&.super_admin?
      render json: { error: 'Super admin access required' }, status: :forbidden
      return false
    end
  end

  def current_admin
    @current_admin
  end
end
```

### Super Admin Controllers

**Base controller for super admin:**

```ruby
# app/controllers/api/v1/super_admin/base_controller.rb
module Api
  module V1
    module SuperAdmin
      class BaseController < Api::V1::BaseController
        include SuperAdminAuthorization

        # Super admins bypass tenant scoping
        skip_before_action :verify_tenant

        private

        def authenticate_admin!
          header = request.headers['Authorization']
          return render json: { error: 'No token provided' }, status: :unauthorized unless header

          token = header.split(' ').last
          begin
            decoded = JsonWebToken.decode(token)
            return render json: { error: 'Invalid token' }, status: :unauthorized unless decoded

            @current_admin = Admin.unscoped.find(decoded[:admin_id])

            unless @current_admin.super_admin?
              return render json: { error: 'Super admin required' }, status: :forbidden
            end
          rescue JWT::DecodeError, ActiveRecord::RecordNotFound
            render json: { error: 'Invalid token' }, status: :unauthorized
          end
        end
      end
    end
  end
end
```

**Tenants management controller:**

```ruby
# app/controllers/api/v1/super_admin/tenants_controller.rb
module Api
  module V1
    module SuperAdmin
      class TenantsController < SuperAdmin::BaseController
        def index
          @tenants = Tenant.all.order(created_at: :desc)

          render json: @tenants.map { |tenant|
            {
              id: tenant.id,
              name: tenant.name,
              slug: tenant.slug,
              domain: tenant.domain,
              active: tenant.active,
              features: tenant.features,
              created_at: tenant.created_at,
              listings_count: tenant.listings.count,
              admins_count: tenant.admins.count
            }
          }
        end

        def show
          @tenant = Tenant.find(params[:id])

          render json: {
            tenant: @tenant,
            stats: {
              listings_count: @tenant.listings.count,
              blog_posts_count: @tenant.blog_posts.count,
              admins_count: @tenant.admins.count,
              testimonials_count: @tenant.testimonials.count,
              club_users_count: @tenant.club_users.count
            }
          }
        end

        def create
          @tenant = Tenant.new(tenant_params)

          if @tenant.save
            render json: {
              tenant: @tenant,
              api_key: @tenant.api_key
            }, status: :created
          else
            render json: { errors: @tenant.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @tenant = Tenant.find(params[:id])

          if @tenant.update(tenant_params)
            render json: @tenant
          else
            render json: { errors: @tenant.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          @tenant = Tenant.find(params[:id])

          # Prevent deletion if tenant has data
          if @tenant.listings.any? || @tenant.admins.any?
            render json: { error: 'Cannot delete tenant with existing data' }, status: :unprocessable_entity
          else
            @tenant.destroy
            head :no_content
          end
        end

        def toggle_active
          @tenant = Tenant.find(params[:id])
          @tenant.update(active: !@tenant.active)

          render json: { tenant: @tenant, message: "Tenant #{@tenant.active ? 'activated' : 'deactivated'}" }
        end

        def rotate_api_key
          @tenant = Tenant.find(params[:id])
          @tenant.regenerate_api_key

          render json: {
            tenant: @tenant,
            new_api_key: @tenant.api_key,
            message: 'API key rotated successfully'
          }
        end

        def analytics
          @tenant = Tenant.find(params[:id])

          render json: {
            tenant_id: @tenant.id,
            tenant_name: @tenant.name,
            date_range: params[:date_range] || 'last_30_days',
            metrics: {
              total_listings: @tenant.listings.count,
              active_listings: @tenant.listings.where(status: [:recent, :standard]).count,
              sold_listings: @tenant.listings.where(status: :sold).count,
              blog_posts: @tenant.blog_posts.count,
              testimonials: @tenant.testimonials.count,
              newsletter_subscriptions: @tenant.newsletter_subscriptions.count,
              club_members: @tenant.club_users.count
            }
          }
        end

        private

        def tenant_params
          params.require(:tenant).permit(
            :name, :slug, :domain, :contact_email, :active,
            :blog_enabled, :club_enabled, :testimonials_enabled,
            :newsletter_enabled, :listing_complexes_enabled
          )
        end
      end
    end
  end
end
```

**Cross-tenant analytics controller:**

```ruby
# app/controllers/api/v1/super_admin/analytics_controller.rb
module Api
  module V1
    module SuperAdmin
      class AnalyticsController < SuperAdmin::BaseController
        def overview
          render json: {
            total_tenants: Tenant.count,
            active_tenants: Tenant.active.count,
            total_listings: Listing.unscoped.count,
            total_admins: Admin.unscoped.count,
            tenants_by_month: tenants_by_month,
            listings_by_tenant: listings_by_tenant
          }
        end

        def tenants_growth
          render json: {
            by_month: tenants_by_month,
            by_week: tenants_by_week
          }
        end

        private

        def tenants_by_month
          Tenant.group_by_month(:created_at, last: 12).count
        end

        def tenants_by_week
          Tenant.group_by_week(:created_at, last: 8).count
        end

        def listings_by_tenant
          Tenant.all.map do |tenant|
            {
              tenant_name: tenant.name,
              listings_count: tenant.listings.count
            }
          end
        end
      end
    end
  end
end
```

### Routes for Super Admin

```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ... existing routes ...

      # Super Admin routes
      namespace :super_admin do
        resources :tenants do
          member do
            patch :toggle_active
            post :rotate_api_key
            get :analytics
          end
        end

        get 'analytics/overview', to: 'analytics#overview'
        get 'analytics/tenants_growth', to: 'analytics#tenants_growth'
      end
    end
  end
end
```

### Creating First Super Admin

```ruby
# db/seeds.rb
super_admin = Admin.find_or_create_by!(email: 'superadmin@yourdomain.com') do |admin|
  admin.password = ENV.fetch('SUPER_ADMIN_PASSWORD', SecureRandom.hex(16))
  admin.role = :super_admin
  admin.tenant_id = nil  # Super admins don't belong to a tenant
  admin.confirmed = true
end

puts "Super Admin created!"
puts "Email: #{super_admin.email}"
puts "Password: #{super_admin.password}" if Rails.env.development?
puts "Role: #{super_admin.role}"
```

## Part 2: Unified Backoffice/CMS

### Architecture Decision: Separate Admin Frontend

**Recommended approach: Build a separate React admin panel**

### Why a Separate Admin Frontend?

**Pros:**
- ✅ Clean separation of concerns
- ✅ Modern, custom-branded UI
- ✅ Reuses existing API (no Rails views needed)
- ✅ Can be deployed independently
- ✅ Better UX than Rails admin gems (ActiveAdmin, RailsAdmin)
- ✅ Full control over UI/UX
- ✅ Same tech stack as public frontend (React/Vite)

**Cons:**
- ❌ More development effort initially
- ❌ Another app to maintain
- ❌ Another deployment

**Alternatives considered:**
1. **ActiveAdmin/RailsAdmin** - Quick setup, but generic UI, hard to customize
2. **Embedded in public frontend** - Mixes concerns, harder to secure
3. **Rails views** - Old-school, doesn't match modern frontend

**Decision: Build separate React admin panel**

### Admin Backoffice Structure

```
/admin-backoffice
├── src/
│   ├── components/
│   │   ├── super-admin/
│   │   │   ├── TenantsList.tsx
│   │   │   ├── TenantForm.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── ApiKeyManagement.tsx
│   │   ├── tenant-admin/
│   │   │   ├── ListingsList.tsx
│   │   │   ├── ListingForm.tsx
│   │   │   ├── BlogPostsList.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── shared/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Table.tsx
│   │   └── auth/
│   │       ├── Login.tsx
│   │       └── ProtectedRoute.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTenants.ts
│   │   └── useListings.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Tech Stack for Admin Backoffice

```json
{
  "name": "real-estate-admin",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.14.0",
    "@tanstack/react-table": "^8.10.0",
    "recharts": "^2.10.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "tailwindcss": "^3.4.0",
    "shadcn-ui": "latest"
  }
}
```

### Key Features

**For Super Admins:**
- Dashboard with system-wide analytics
- Tenant management (CRUD)
- API key management and rotation
- Feature flag configuration
- Cross-tenant reporting
- Admin user management

**For Tenant Admins:**
- Dashboard with tenant-specific analytics
- Listings management
- Blog posts management (if enabled)
- Club stories management (if enabled)
- Testimonials management
- Newsletter subscriptions
- Settings and profile

### Authentication Flow

```typescript
// admin-backoffice/src/services/auth.ts
import { apiClient } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  admin: {
    id: number;
    email: string;
    role: 'tenant_admin' | 'super_admin';
    tenant_id?: number;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Note: Super admins don't need API key
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials,
      {
        headers: {
          // No X-API-Key needed for super admin login
        },
      }
    );

    // Store token
    localStorage.setItem('admin_token', response.token);
    localStorage.setItem('admin_role', response.admin.role);

    return response;
  },

  async logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
  },

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  },

  getRole(): string | null {
    return localStorage.getItem('admin_role');
  },

  isSuperAdmin(): boolean {
    return this.getRole() === 'super_admin';
  },
};
```

### API Client for Admin

```typescript
// admin-backoffice/src/services/api.ts
import { authService } from './auth';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const token = authService.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

### Example: Tenants Management Page (Super Admin)

```typescript
// admin-backoffice/src/pages/super-admin/Tenants.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  active: boolean;
  features: {
    blog_enabled: boolean;
    club_enabled: boolean;
    testimonials_enabled: boolean;
    newsletter_enabled: boolean;
    listing_complexes_enabled: boolean;
  };
  listings_count: number;
  admins_count: number;
}

export function TenantsPage() {
  const queryClient = useQueryClient();

  const { data: tenants, isLoading } = useQuery<Tenant[]>({
    queryKey: ['super_admin', 'tenants'],
    queryFn: () => apiClient.get('/super_admin/tenants'),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (tenantId: number) =>
      apiClient.patch(`/super_admin/tenants/${tenantId}/toggle_active`),
    onSuccess: () => {
      queryClient.invalidateQueries(['super_admin', 'tenants']);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <button className="btn-primary">Add New Tenant</button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Domain</th>
              <th className="text-left p-4">Listings</th>
              <th className="text-left p-4">Admins</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants?.map((tenant) => (
              <tr key={tenant.id} className="border-b">
                <td className="p-4">{tenant.name}</td>
                <td className="p-4">{tenant.domain}</td>
                <td className="p-4">{tenant.listings_count}</td>
                <td className="p-4">{tenant.admins_count}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      tenant.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tenant.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleActiveMutation.mutate(tenant.id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    {tenant.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Deployment

**Option 1: Vercel (Recommended)**

```bash
cd admin-backoffice
vercel --prod
```

**Option 2: Railway**

```bash
# Add to monorepo
railway up --service admin-backoffice
```

**Option 3: Subdomain**

```
https://admin.yourdomain.com  -> Admin backoffice
https://api.yourdomain.com    -> Rails API
https://sofiagalvaogroup.com  -> SGG public site
```

### Security Considerations

**1. Authentication**
- JWT tokens with short expiration (1 hour)
- Refresh tokens for staying logged in
- Logout invalidates tokens

**2. Authorization**
- Super admins bypass tenant scoping in API
- Tenant admins automatically scoped to their tenant
- RBAC (Role-Based Access Control)

**3. CORS**
- Only allow admin.yourdomain.com
- Different from public CORS

**4. Rate Limiting**
- Stricter limits for admin endpoints
- Per-IP rate limiting

**5. Audit Logging**
- Log all super admin actions
- Track who changed what and when

## Implementation Checklist

### Phase 1: Super Admin Backend (2-3 days)

- [ ] Add `role` column to admins table
- [ ] Update Admin model with roles
- [ ] Create SuperAdminAuthorization concern
- [ ] Create SuperAdmin::BaseController
- [ ] Create SuperAdmin::TenantsController
- [ ] Create SuperAdmin::AnalyticsController
- [ ] Add routes for super admin
- [ ] Create first super admin via seeds
- [ ] Test super admin API endpoints

### Phase 2: Admin Backoffice Setup (1 week)

- [ ] Create new Vite + React project
- [ ] Set up routing (React Router)
- [ ] Set up state management (Zustand)
- [ ] Set up API client
- [ ] Implement authentication
- [ ] Create layout (sidebar, header)
- [ ] Style with Tailwind + shadcn/ui

### Phase 3: Super Admin UI (1 week)

- [ ] Dashboard with analytics
- [ ] Tenants list page
- [ ] Tenant create/edit form
- [ ] API key management
- [ ] Feature flags UI
- [ ] Cross-tenant analytics

### Phase 4: Tenant Admin UI (2 weeks)

- [ ] Dashboard
- [ ] Listings management
- [ ] Blog posts management
- [ ] Testimonials management
- [ ] Settings page

### Phase 5: Deployment (2-3 days)

- [ ] Deploy admin backoffice to Vercel
- [ ] Set up custom domain (admin.yourdomain.com)
- [ ] Configure CORS
- [ ] Test end-to-end
- [ ] Document for team

## Estimated Timeline

- **Backend (Super Admin)**: 2-3 days
- **Admin Backoffice**: 4-5 weeks
  - Setup & Auth: 1 week
  - Super Admin UI: 1 week
  - Tenant Admin UI: 2 weeks
  - Polish & Testing: 1 week

## Summary

This architecture provides:

✅ **Super admin** with full system access
✅ **Tenant admins** scoped to their data
✅ **Modern, custom UI** built with React
✅ **Centralized management** for all tenants
✅ **Secure** role-based access control
✅ **Scalable** architecture

The unified backoffice acts as a CMS that:
- Manages multiple tenants from one place
- Provides modern UX (not generic Rails admin)
- Reuses existing API infrastructure
- Can be deployed independently
- Is fully brandable and customizable
