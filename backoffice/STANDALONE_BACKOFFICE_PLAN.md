# Standalone Multi-Tenant Backoffice CMS - Implementation Plan

## 🎯 Project Overview

Transform the current tightly-coupled backoffice into a standalone, universal CMS that works for all tenants, with live preview functionality and modern UI/UX.

### Current State
- **47 total pages**: 20 public + 27 admin pages
- **Tightly coupled**: Backoffice at `/backoffice/*` in same app
- **Brand-specific colors**: Beige theme (#d3af79) tied to Sofia Galvão Group
- **Single build**: Any change requires rebuild for all tenants
- **No preview**: Admins can't see how content looks on public site

### Target Architecture
```
/api                      (Port 3000)
├── Shared Rails API
└── Serves all tenants

/backoffice              (Port 3001) NEW ⭐
├── Universal admin CMS
├── Neutral design
├── Works for ALL tenants
└── Preview functionality

/frontend                (Port 5173) SIMPLIFIED
├── Public pages only
├── Tenant-specific branding
├── Lightweight build
└── Template for new tenants
```

### Deployment Model
```
Production:
├── admin.yoursaas.com       → Backoffice (single deployment)
├── api.yoursaas.com         → API
├── sofiagalvaogroup.com     → Tenant 1 Frontend
├── anotheragency.com        → Tenant 2 Frontend
└── thirdagency.com          → Tenant 3 Frontend
```

---

## 📋 PHASE 1: Tenant Management ✅ COMPLETED

### Priority: HIGHEST
### Status: ✅ Completed
### Time Taken: 1 day

### Overview
Enable super admins to fully manage tenants (create agencies, control features, manage API keys).

### 1.1 Backend - Tenant CRUD Controller

**File:** `api/app/controllers/api/v1/super_admin/tenants_controller.rb`

**Actions Implemented:**
- ✅ `index` - List all tenants with search/filter
- ✅ `show` - Get single tenant details
- ✅ `create` - Create new tenant
- ✅ `update` - Update tenant info
- ✅ `destroy` - Delete tenant (with safety checks)
- ✅ `toggle_active` - Activate/deactivate tenant
- ✅ `rotate_api_key` - Regenerate API key
- ✅ `update_features` - Enable/disable features

**Safety Checks:**
- Cannot delete tenant with existing data (listings, blog posts, etc.)
- Deletion requires typing tenant name exactly
- API key rotation sends notification
- Deactivation preserves data

**Strong Parameters:**
```ruby
def tenant_params
  params.require(:tenant).permit(
    :name,
    :slug,
    :domain,
    :contact_email,
    :active,
    :blog_enabled,
    :club_enabled,
    :testimonials_enabled,
    :newsletter_enabled,
    :listing_complexes_enabled,
    metadata: {}
  )
end
```

### 1.2 Backend - Routes

**File:** `api/config/routes.rb`

```ruby
namespace :super_admin do
  resources :admins do
    member do
      post :confirm
      post :unconfirm
      post :reset_password
    end
  end

  resources :tenants do
    member do
      post :toggle_active
      post :rotate_api_key
      patch :update_features
    end
  end
end
```

### 1.3 Backend - Translations

**Files:**
- `api/config/locales/en.yml`
- `api/config/locales/pt.yml`

**English:**
```yaml
super_admin:
  tenants:
    created: "Tenant created successfully"
    updated: "Tenant updated successfully"
    deleted: "Tenant deleted successfully"
    activated: "Tenant activated"
    deactivated: "Tenant deactivated"
    api_key_rotated: "API key regenerated successfully"
    features_updated: "Features updated successfully"
    cannot_delete_with_data: "Cannot delete tenant with existing data. Please delete all associated content first."
    delete_confirm_message: "Type '%{tenant_name}' exactly to confirm deletion"
    delete_mismatch: "Tenant name does not match. Deletion cancelled."
```

**Portuguese:**
```yaml
super_admin:
  tenants:
    created: "Tenant criado com sucesso"
    updated: "Tenant atualizado com sucesso"
    deleted: "Tenant eliminado com sucesso"
    activated: "Tenant ativado"
    deactivated: "Tenant desativado"
    api_key_rotated: "API key regenerada com sucesso"
    features_updated: "Funcionalidades atualizadas com sucesso"
    cannot_delete_with_data: "Não é possível eliminar tenant com dados existentes. Por favor, elimine todo o conteúdo associado primeiro."
    delete_confirm_message: "Digite '%{tenant_name}' exatamente para confirmar a eliminação"
    delete_mismatch: "Nome do tenant não corresponde. Eliminação cancelada."
```

### 1.4 Frontend - Tenants Page

**File:** `frontend/src/pages/Admin/SuperAdmin/SuperAdminTenantsPage.tsx`

**Features:**
- Table displaying:
  - Name
  - Slug
  - Domain (optional)
  - Status badge (Active/Inactive)
  - API Key (masked: `••••••••••••${key.slice(-4)}`)
  - Created Date
  - Actions
- Search by name or domain
- Filter by Active/Inactive status
- Pagination (25 per page)
- Actions per row:
  - Edit
  - Delete (with confirmation)
  - Activate/Deactivate toggle
  - Rotate API Key (with confirmation)
  - View Details

### 1.5 Frontend - Tenant Form Modal

**File:** `frontend/src/components/SuperAdmin/TenantFormModal.tsx`

**Form Sections:**

**Basic Information:**
- Name (required, unique)
- Slug (auto-generated from name, editable)
- Domain (optional, e.g., `sofiagalvaogroup.com`)
- Contact Email (optional)
- Active toggle

**Feature Toggles:**
- ☑ Blog enabled
- ☐ Club enabled (default off - SGG specific)
- ☑ Testimonials enabled
- ☑ Newsletter enabled
- ☑ Listing complexes enabled

**Advanced (Collapsible):**
- Metadata JSON editor (optional)

**Validation:**
- Name: Required, must be unique
- Slug: Required, unique, format: `^[a-z0-9-]+$`
- Email: Valid email format (if provided)
- Domain: Valid domain format (if provided)

### 1.6 Frontend - API Service

**File:** `frontend/src/services/api.ts`

Add these functions:
```typescript
// Tenants Management
export const superAdminGetTenants = (params = {}) =>
  api.get(apiRoutes.superAdmin.tenants, { params });

export const superAdminGetTenant = (id) =>
  api.get(apiRoutes.superAdmin.tenant(id));

export const superAdminCreateTenant = (data) =>
  api.post(apiRoutes.superAdmin.tenants, { tenant: data });

export const superAdminUpdateTenant = (id, data) =>
  api.put(apiRoutes.superAdmin.tenant(id), { tenant: data });

export const superAdminDeleteTenant = (id, confirmName) =>
  api.delete(apiRoutes.superAdmin.tenant(id), {
    data: { confirm_name: confirmName }
  });

export const superAdminToggleActiveTenant = (id) =>
  api.post(apiRoutes.superAdmin.toggleActiveTenant(id));

export const superAdminRotateApiKey = (id) =>
  api.post(apiRoutes.superAdmin.rotateApiKeyTenant(id));

export const superAdminUpdateFeatures = (id, features) =>
  api.patch(apiRoutes.superAdmin.updateFeaturesTenant(id), { features });
```

### 1.7 Frontend - Routes

**File:** `frontend/src/utils/routes.ts`

Add to `superAdmin` section:
```typescript
superAdmin: {
  admins: `${API_BASE_URL}/super_admin/admins`,
  admin: (id: string | number) => `${API_BASE_URL}/super_admin/admins/${id}`,
  confirmAdmin: (id: string | number) => `${API_BASE_URL}/super_admin/admins/${id}/confirm`,
  unconfirmAdmin: (id: string | number) => `${API_BASE_URL}/super_admin/admins/${id}/unconfirm`,
  resetPasswordAdmin: (id: string | number) => `${API_BASE_URL}/super_admin/admins/${id}/reset_password`,

  // NEW - Tenants
  tenants: `${API_BASE_URL}/super_admin/tenants`,
  tenant: (id: string | number) => `${API_BASE_URL}/super_admin/tenants/${id}`,
  toggleActiveTenant: (id: string | number) => `${API_BASE_URL}/super_admin/tenants/${id}/toggle_active`,
  rotateApiKeyTenant: (id: string | number) => `${API_BASE_URL}/super_admin/tenants/${id}/rotate_api_key`,
  updateFeaturesTenant: (id: string | number) => `${API_BASE_URL}/super_admin/tenants/${id}/update_features`,
}
```

### 1.8 Frontend - App Routes

**File:** `frontend/src/App.tsx`

Add route in Super Admin section:
```tsx
{/* Super Admin Routes */}
<Route
  path="super_admin/admins"
  element={
    <SuperAdminRoute>
      <SuperAdminAdminsPage />
    </SuperAdminRoute>
  }
/>
<Route
  path="super_admin/tenants"
  element={
    <SuperAdminRoute>
      <SuperAdminTenantsPage />
    </SuperAdminRoute>
  }
/>
```

### 1.9 Frontend - Navigation

**File:** `frontend/src/components/layout/Navbar.tsx`

Update super admin menu items:
```typescript
if (currentAdmin?.isSuperAdmin) {
  backofficeNavItems.push(
    {
      routeName: "backoffice_super_admin_admins_path",
      title: t("navbar.super_admin_admins"),
    },
    {
      routeName: "backoffice_super_admin_tenants_path",
      title: t("navbar.super_admin_tenants"),
    }
  );
}
```

### 1.10 Frontend - Translations

**Files:**
- `frontend/src/locales/en/super_admin.json`
- `frontend/src/locales/pt/super_admin.json`
- `frontend/src/locales/en/navbar.json`
- `frontend/src/locales/pt/navbar.json`

**super_admin.json (English):**
```json
{
  "admins": { /* existing admin translations */ },
  "tenants": {
    "title": "Manage Tenants",
    "create_new": "Create New Tenant",
    "create_tenant": "Create Tenant",
    "edit_tenant": "Edit Tenant",
    "name": "Name",
    "slug": "Slug",
    "domain": "Domain",
    "contact_email": "Contact Email",
    "active": "Active",
    "inactive": "Inactive",
    "status": "Status",
    "api_key": "API Key",
    "api_key_masked": "API Key (Last 4)",
    "features": "Features",
    "basic_info": "Basic Information",
    "feature_toggles": "Feature Toggles",
    "advanced_settings": "Advanced Settings",
    "blog_enabled": "Blog",
    "club_enabled": "Club (SGG Specific)",
    "testimonials_enabled": "Testimonials",
    "newsletter_enabled": "Newsletter",
    "listing_complexes_enabled": "Listing Complexes",
    "created_at": "Created At",
    "updated_at": "Updated At",
    "rotate_api_key": "Rotate API Key",
    "show_api_key": "Show API Key",
    "copy_api_key": "Copy API Key",
    "copied": "Copied!",
    "rotate_confirm": "Are you sure you want to regenerate the API key? The old key will stop working immediately.",
    "delete_confirm_title": "Delete Tenant",
    "delete_confirm_message": "This action cannot be undone. To confirm, type the tenant name exactly:",
    "delete_placeholder": "Type tenant name here",
    "cannot_delete": "Cannot delete tenant with existing data. Please delete all associated content first.",
    "deactivate_confirm": "Are you sure you want to deactivate this tenant? Users won't be able to access their content.",
    "activate_confirm": "Are you sure you want to activate this tenant?",
    "no_tenants": "No tenants found",
    "all_statuses": "All Statuses",
    "search_placeholder": "Search by name or domain...",
    "slug_auto": "Auto-generated from name",
    "errors": {
      "name_required": "Name is required",
      "slug_required": "Slug is required",
      "slug_format": "Slug can only contain lowercase letters, numbers, and hyphens",
      "email_format": "Invalid email format",
      "domain_format": "Invalid domain format",
      "generic": "An error occurred. Please try again."
    }
  }
}
```

**super_admin.json (Portuguese):**
```json
{
  "admins": { /* existing admin translations */ },
  "tenants": {
    "title": "Gerir Tenants",
    "create_new": "Criar Novo Tenant",
    "create_tenant": "Criar Tenant",
    "edit_tenant": "Editar Tenant",
    "name": "Nome",
    "slug": "Slug",
    "domain": "Domínio",
    "contact_email": "Email de Contacto",
    "active": "Ativo",
    "inactive": "Inativo",
    "status": "Estado",
    "api_key": "API Key",
    "api_key_masked": "API Key (Últimos 4)",
    "features": "Funcionalidades",
    "basic_info": "Informação Básica",
    "feature_toggles": "Funcionalidades",
    "advanced_settings": "Configurações Avançadas",
    "blog_enabled": "Blog",
    "club_enabled": "Clube (Específico SGG)",
    "testimonials_enabled": "Testemunhos",
    "newsletter_enabled": "Newsletter",
    "listing_complexes_enabled": "Empreendimentos",
    "created_at": "Criado Em",
    "updated_at": "Atualizado Em",
    "rotate_api_key": "Regenerar API Key",
    "show_api_key": "Mostrar API Key",
    "copy_api_key": "Copiar API Key",
    "copied": "Copiado!",
    "rotate_confirm": "Tem a certeza que deseja regenerar a API key? A chave antiga deixará de funcionar imediatamente.",
    "delete_confirm_title": "Eliminar Tenant",
    "delete_confirm_message": "Esta ação não pode ser desfeita. Para confirmar, digite o nome do tenant exatamente:",
    "delete_placeholder": "Digite o nome do tenant aqui",
    "cannot_delete": "Não é possível eliminar tenant com dados existentes. Por favor, elimine todo o conteúdo associado primeiro.",
    "deactivate_confirm": "Tem a certeza que deseja desativar este tenant? Os utilizadores não poderão aceder ao seu conteúdo.",
    "activate_confirm": "Tem a certeza que deseja ativar este tenant?",
    "no_tenants": "Nenhum tenant encontrado",
    "all_statuses": "Todos os Estados",
    "search_placeholder": "Pesquisar por nome ou domínio...",
    "slug_auto": "Gerado automaticamente a partir do nome",
    "errors": {
      "name_required": "Nome é obrigatório",
      "slug_required": "Slug é obrigatório",
      "slug_format": "Slug só pode conter letras minúsculas, números e hífenes",
      "email_format": "Formato de email inválido",
      "domain_format": "Formato de domínio inválido",
      "generic": "Ocorreu um erro. Por favor, tente novamente."
    }
  }
}
```

**navbar.json (add to both en and pt):**
```json
{
  "super_admin_admins": "Manage Admins",
  "super_admin_tenants": "Manage Tenants"
}
```

---

## 📋 PHASE 2: Create Standalone Backoffice

### Status: Planned
### Estimated Time: 1 day

### Overview
Separate the backoffice into its own application, removing public pages and creating a lightweight, universal CMS.

### Implementation Steps
See detailed plan in sections 2.1-2.3 above.

---

## 📋 PHASE 3: Preview Functionality

### Status: Planned
### Estimated Time: 2-3 days

### Overview
Enable admins to preview content before publishing, with responsive device switcher and live preview in iframe.

### Implementation Steps
See detailed plan in sections 3.1-3.5 above.

---

## 📋 PHASE 4: Modern UI/UX Redesign

### Status: Planned
### Estimated Time: 3-4 days

### Overview
Replace brand-specific design with neutral, professional theme. Create reusable component library and implement sidebar navigation.

### Components to Create
- Card
- Button (4 variants)
- Badge (5 variants)
- Table
- Modal
- Input/Select
- Tabs
- Sidebar
- Breadcrumbs

### Implementation Steps
See detailed plan in sections 4.1-4.5 above.

---

## 📋 PHASE 5: Testing & Deployment

### Status: Planned
### Estimated Time: 1 day

### Testing Checklist
- [ ] Tenant CRUD operations
- [ ] Preview functionality
- [ ] Responsive design
- [ ] Dark mode
- [ ] Authentication
- [ ] Multi-tenant isolation
- [ ] API key rotation
- [ ] Feature toggles

---

## ⏱️ Overall Timeline

- **Phase 1 (Tenant Management):** 2-3 days ← **CURRENT**
- **Phase 2 (Standalone Backoffice):** 1 day
- **Phase 3 (Preview Functionality):** 2-3 days
- **Phase 4 (Modern UI/UX):** 3-4 days
- **Phase 5 (Testing & Deployment):** 1 day

**Total:** ~10-12 days

---

## 🎯 Success Criteria

✅ Super admin can create/edit/delete tenants
✅ Backoffice works independently of tenant frontends
✅ Admins can preview content before publishing
✅ Modern, neutral UI that feels professional
✅ Fully responsive on all devices
✅ Dark mode throughout
✅ Fast loading and smooth animations
✅ Single backoffice serves unlimited tenants

---

## 📝 Notes

- All tenant data is isolated using `Current.tenant` context
- API keys are 24-character base58 strings
- Super admins (tenant_id = null) can access all tenants
- Preview uses JWT tokens for authentication
- Frontend public sites are tenant-branded
- Backoffice uses neutral colors and professional design
