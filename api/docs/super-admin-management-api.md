# Super Admin Management API & Frontend Requirements

This document outlines the API endpoints and frontend changes needed for super admins to manage tenant admins.

## Overview

Super admins need the ability to:
- View all admins across all tenants
- Create new admin users and assign them to tenants
- Edit existing admin details
- Confirm/unconfirm admin accounts
- Delete admin accounts
- Reassign admins to different tenants
- Promote/demote admins to/from super admin status

## API Endpoints to Create

### 1. List All Admins (Super Admin Only)

```
GET /api/v1/super_admin/admins
```

**Authorization:** Super Admin only (tenant_id = NULL)

**Query Parameters:**
- `page` (optional): Page number for pagination
- `per_page` (optional): Results per page (default: 25)
- `tenant_id` (optional): Filter by tenant
- `confirmed` (optional): Filter by confirmation status (true/false)
- `search` (optional): Search by email or name

**Response:**
```json
{
  "admins": [
    {
      "id": 1,
      "email": "admin@sofiagalvaogroup.com",
      "confirmed": true,
      "tenant_id": 1,
      "tenant": {
        "id": 1,
        "name": "Sofia Galvao Group",
        "slug": "sgg"
      },
      "created_at": "2025-10-06T19:14:37.000Z",
      "last_sign_in_at": "2025-10-06T20:00:00.000Z"
    },
    {
      "id": 2,
      "email": "superadmin@example.com",
      "confirmed": true,
      "tenant_id": null,
      "tenant": null,
      "created_at": "2025-10-06T19:14:37.000Z",
      "last_sign_in_at": null
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 75,
    "per_page": 25
  }
}
```

---

### 2. Get Single Admin Details

```
GET /api/v1/super_admin/admins/:id
```

**Authorization:** Super Admin only

**Response:**
```json
{
  "admin": {
    "id": 1,
    "email": "admin@sofiagalvaogroup.com",
    "confirmed": true,
    "tenant_id": 1,
    "tenant": {
      "id": 1,
      "name": "Sofia Galvao Group",
      "slug": "sgg",
      "domain": "sofiagalvaogroup.com"
    },
    "created_at": "2025-10-06T19:14:37.000Z",
    "updated_at": "2025-10-06T19:14:37.000Z",
    "last_sign_in_at": "2025-10-06T20:00:00.000Z",
    "sign_in_count": 15
  }
}
```

---

### 3. Create New Admin

```
POST /api/v1/super_admin/admins
```

**Authorization:** Super Admin only

**Request Body:**
```json
{
  "admin": {
    "email": "newadmin@example.com",
    "password": "securepassword123",
    "password_confirmation": "securepassword123",
    "tenant_id": 1,  // null for super admin
    "confirmed": true  // optional, defaults to false
  }
}
```

**Response (201 Created):**
```json
{
  "admin": {
    "id": 3,
    "email": "newadmin@example.com",
    "confirmed": true,
    "tenant_id": 1,
    "tenant": {
      "id": 1,
      "name": "Sofia Galvao Group",
      "slug": "sgg"
    },
    "created_at": "2025-10-06T20:00:00.000Z"
  },
  "message": "Admin created successfully"
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "error": "Email has already been taken"
}
```

---

### 4. Update Admin

```
PATCH /api/v1/super_admin/admins/:id
```

**Authorization:** Super Admin only

**Request Body:**
```json
{
  "admin": {
    "email": "updatedemail@example.com",
    "tenant_id": 2,  // Reassign to different tenant
    "confirmed": true
  }
}
```

**Response (200 OK):**
```json
{
  "admin": {
    "id": 3,
    "email": "updatedemail@example.com",
    "confirmed": true,
    "tenant_id": 2,
    "tenant": {
      "id": 2,
      "name": "Test Real Estate Agency",
      "slug": "test-agency"
    }
  },
  "message": "Admin updated successfully"
}
```

---

### 5. Confirm Admin

```
POST /api/v1/super_admin/admins/:id/confirm
```

**Authorization:** Super Admin only

**Response (200 OK):**
```json
{
  "admin": {
    "id": 3,
    "email": "admin@example.com",
    "confirmed": true
  },
  "message": "Admin confirmed successfully"
}
```

---

### 6. Unconfirm Admin

```
POST /api/v1/super_admin/admins/:id/unconfirm
```

**Authorization:** Super Admin only

**Response (200 OK):**
```json
{
  "admin": {
    "id": 3,
    "email": "admin@example.com",
    "confirmed": false
  },
  "message": "Admin unconfirmed successfully"
}
```

---

### 7. Delete Admin

```
DELETE /api/v1/super_admin/admins/:id
```

**Authorization:** Super Admin only

**Response (200 OK):**
```json
{
  "message": "Admin deleted successfully"
}
```

**Error Response (403 Forbidden):**
```json
{
  "error": "Cannot delete yourself"
}
```

---

### 8. Reset Admin Password

```
POST /api/v1/super_admin/admins/:id/reset_password
```

**Authorization:** Super Admin only

**Request Body:**
```json
{
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successfully"
}
```

---

### 9. List All Tenants (for dropdown)

```
GET /api/v1/super_admin/tenants
```

**Authorization:** Super Admin only

**Response:**
```json
{
  "tenants": [
    {
      "id": 1,
      "name": "Sofia Galvao Group",
      "slug": "sgg",
      "domain": "sofiagalvaogroup.com",
      "active": true
    },
    {
      "id": 2,
      "name": "Test Real Estate Agency",
      "slug": "test-agency",
      "domain": "test-agency.example.com",
      "active": true
    }
  ]
}
```

---

## Backend Implementation Checklist

### Controller Creation

Create `app/controllers/api/v1/super_admin/admins_controller.rb`:

```ruby
# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class AdminsController < Api::V1::BaseController
        before_action :authenticate_admin!
        before_action :require_super_admin!
        before_action :set_admin, only: [:show, :update, :destroy, :confirm, :unconfirm, :reset_password]

        def index
          admins = Admin.all
          admins = admins.where(tenant_id: params[:tenant_id]) if params[:tenant_id].present?
          admins = admins.where(confirmed: params[:confirmed]) if params[:confirmed].present?
          admins = admins.where('email ILIKE ?', "%#{params[:search]}%") if params[:search].present?

          paginated = paginate(admins.includes(:tenant), serializer: AdminSerializer)

          render json: {
            admins: paginated[:data],
            pagination: paginated[:pagination]
          }
        end

        def show
          render json: @admin, serializer: AdminSerializer, include_details: true
        end

        def create
          @admin = Admin.new(admin_params)

          if @admin.save
            render json: {
              admin: AdminSerializer.new(@admin).as_json,
              message: 'Admin created successfully'
            }, status: :created
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def update
          if @admin.update(admin_params)
            render json: {
              admin: AdminSerializer.new(@admin).as_json,
              message: 'Admin updated successfully'
            }
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        def destroy
          if @admin.id == @current_admin.id
            render json: { error: 'Cannot delete yourself' }, status: :forbidden
            return
          end

          @admin.destroy
          render json: { message: 'Admin deleted successfully' }
        end

        def confirm
          @admin.update(confirmed: true)
          render json: {
            admin: { id: @admin.id, email: @admin.email, confirmed: @admin.confirmed },
            message: 'Admin confirmed successfully'
          }
        end

        def unconfirm
          if @admin.id == @current_admin.id
            render json: { error: 'Cannot unconfirm yourself' }, status: :forbidden
            return
          end

          @admin.update(confirmed: false)
          render json: {
            admin: { id: @admin.id, email: @admin.email, confirmed: @admin.confirmed },
            message: 'Admin unconfirmed successfully'
          }
        end

        def reset_password
          if params[:password].blank? || params[:password] != params[:password_confirmation]
            render json: { error: 'Password and confirmation must match' }, status: :unprocessable_entity
            return
          end

          @admin.password = params[:password]
          if @admin.save
            render json: { message: 'Password reset successfully' }
          else
            render json: { error: @admin.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        private

        def set_admin
          @admin = Admin.find(params[:id])
        end

        def admin_params
          params.require(:admin).permit(:email, :password, :password_confirmation, :tenant_id, :confirmed)
        end

        def require_super_admin!
          unless @current_admin&.super_admin?
            render json: { error: 'Super admin access required' }, status: :forbidden
          end
        end
      end
    end
  end
end
```

### Create Tenants Controller

Create `app/controllers/api/v1/super_admin/tenants_controller.rb`:

```ruby
# frozen_string_literal: true

module Api
  module V1
    module SuperAdmin
      class TenantsController < Api::V1::BaseController
        before_action :authenticate_admin!
        before_action :require_super_admin!

        def index
          tenants = Tenant.active.order(:name)
          render json: { tenants: tenants.as_json(only: [:id, :name, :slug, :domain, :active]) }
        end

        private

        def require_super_admin!
          unless @current_admin&.super_admin?
            render json: { error: 'Super admin access required' }, status: :forbidden
          end
        end
      end
    end
  end
end
```

### Update Routes

Add to `config/routes.rb`:

```ruby
namespace :super_admin do
  resources :admins do
    member do
      post :confirm
      post :unconfirm
      post :reset_password
    end
  end
  resources :tenants, only: [:index]
end
```

### Create Serializer

Create `app/serializers/admin_serializer.rb`:

```ruby
# frozen_string_literal: true

class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :confirmed, :tenant_id, :created_at, :updated_at

  belongs_to :tenant, optional: true

  # Include additional details when requested
  attribute :last_sign_in_at, if: :include_details?
  attribute :sign_in_count, if: :include_details?

  def include_details?
    instance_options[:include_details]
  end
end
```

---

## Frontend Implementation

### New Pages/Components Required

#### 1. Admin Management Page (`/backoffice/super-admin/admins`)

**Features:**
- Table displaying all admins with columns:
  - Email
  - Tenant Name (or "Super Admin")
  - Confirmed Status (badge)
  - Last Sign In
  - Actions (Edit, Delete, Confirm/Unconfirm)
- Search bar to filter by email
- Filter dropdown for tenant
- Filter dropdown for confirmation status
- "Create New Admin" button
- Pagination controls

#### 2. Create/Edit Admin Modal/Form

**Fields:**
- Email (required)
- Password (required on create, optional on edit)
- Password Confirmation
- Tenant Selection (dropdown with "Super Admin" option)
  - Show as "Super Admin" when tenant_id is null
  - Show tenant name when assigned
- Confirmed checkbox
- Submit/Cancel buttons

#### 3. Confirmation Dialog

For delete and unconfirm actions:
- "Are you sure you want to delete this admin?"
- "Are you sure you want to unconfirm this admin? They will lose access until re-confirmed."

### Example React Component Structure

```tsx
// pages/SuperAdmin/AdminManagement.tsx
import { useState, useEffect } from 'react'
import { AdminTable } from '@/components/SuperAdmin/AdminTable'
import { AdminForm } from '@/components/SuperAdmin/AdminForm'
import { useAdmins } from '@/hooks/useAdmins'

export function AdminManagement() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const { admins, pagination, loading, refresh } = useAdmins()

  return (
    <div className="admin-management">
      <header>
        <h1>Admin Management</h1>
        <button onClick={() => setIsCreating(true)}>
          Create New Admin
        </button>
      </header>

      <AdminTable
        admins={admins}
        pagination={pagination}
        onEdit={setEditingAdmin}
        onDelete={handleDelete}
        onConfirm={handleConfirm}
        onUnconfirm={handleUnconfirm}
        onResetPassword={handleResetPassword}
      />

      {(isCreating || editingAdmin) && (
        <AdminForm
          admin={editingAdmin}
          onSuccess={() => {
            setIsCreating(false)
            setEditingAdmin(null)
            refresh()
          }}
          onCancel={() => {
            setIsCreating(false)
            setEditingAdmin(null)
          }}
        />
      )}
    </div>
  )
}
```

### API Client Functions

```typescript
// api/superAdmin.ts
import { apiClient } from './client'

export const superAdminAPI = {
  // List all admins
  getAdmins: (params?: {
    page?: number
    per_page?: number
    tenant_id?: number
    confirmed?: boolean
    search?: string
  }) => apiClient.get('/api/v1/super_admin/admins', { params }),

  // Get single admin
  getAdmin: (id: number) =>
    apiClient.get(`/api/v1/super_admin/admins/${id}`),

  // Create admin
  createAdmin: (data: {
    email: string
    password: string
    password_confirmation: string
    tenant_id?: number
    confirmed?: boolean
  }) => apiClient.post('/api/v1/super_admin/admins', { admin: data }),

  // Update admin
  updateAdmin: (id: number, data: Partial<{
    email: string
    tenant_id: number
    confirmed: boolean
  }>) => apiClient.patch(`/api/v1/super_admin/admins/${id}`, { admin: data }),

  // Delete admin
  deleteAdmin: (id: number) =>
    apiClient.delete(`/api/v1/super_admin/admins/${id}`),

  // Confirm admin
  confirmAdmin: (id: number) =>
    apiClient.post(`/api/v1/super_admin/admins/${id}/confirm`),

  // Unconfirm admin
  unconfirmAdmin: (id: number) =>
    apiClient.post(`/api/v1/super_admin/admins/${id}/unconfirm`),

  // Reset password
  resetAdminPassword: (id: number, password: string, passwordConfirmation: string) =>
    apiClient.post(`/api/v1/super_admin/admins/${id}/reset_password`, {
      password,
      password_confirmation: passwordConfirmation
    }),

  // Get tenants for dropdown
  getTenants: () =>
    apiClient.get('/api/v1/super_admin/tenants')
}
```

---

## Navigation & Access Control

### Update Sidebar/Navigation

Add a "Super Admin" section visible only to super admins:

```tsx
{currentAdmin?.isSuperAdmin && (
  <nav>
    <NavSection title="Super Admin">
      <NavItem href="/backoffice/super-admin/admins" icon={UsersIcon}>
        Admin Management
      </NavItem>
      <NavItem href="/backoffice/super-admin/tenants" icon={BuildingIcon}>
        Tenant Management
      </NavItem>
    </NavSection>
  </nav>
)}
```

### Route Protection

Protect super admin routes:

```tsx
// routes/SuperAdminRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function SuperAdminRoute({ children }) {
  const { currentAdmin, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  if (!currentAdmin?.isSuperAdmin) {
    return <Navigate to="/backoffice/dashboard" replace />
  }

  return children
}
```

---

## Testing Checklist

### Backend Tests
- [ ] Super admin can list all admins
- [ ] Super admin can create admins with/without tenant
- [ ] Super admin can update admin details
- [ ] Super admin can reassign admin to different tenant
- [ ] Super admin can confirm/unconfirm admins
- [ ] Super admin can delete admins (but not themselves)
- [ ] Super admin can reset admin passwords
- [ ] Regular tenant admins cannot access super admin endpoints
- [ ] Validation errors are returned correctly

### Frontend Tests
- [ ] Super admin menu item is visible only to super admins
- [ ] Admin table displays all admins with correct data
- [ ] Search and filters work correctly
- [ ] Create admin form validates input
- [ ] Edit admin form pre-fills with existing data
- [ ] Tenant dropdown shows all available tenants
- [ ] Confirmation dialogs prevent accidental deletions
- [ ] Success/error messages display correctly
- [ ] Pagination works correctly

---

## Security Considerations

1. **Authorization**: All endpoints must verify super admin status
2. **Self-modification**: Prevent super admins from:
   - Deleting themselves
   - Unconfirming themselves
   - Demoting themselves (if role system is added)
3. **Password Security**: Enforce strong password requirements
4. **Audit Logging**: Consider logging all admin management actions
5. **Rate Limiting**: Apply rate limits to prevent brute force attacks

---

## Future Enhancements

- Audit log for admin actions
- Email notifications when admin is created/modified
- Bulk admin operations
- Export admin list to CSV
- Admin activity dashboard
- Two-factor authentication management
- Role-based permissions (beyond just super admin)
