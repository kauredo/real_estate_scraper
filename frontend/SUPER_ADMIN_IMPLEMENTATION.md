# Super Admin Frontend Implementation Guide

This guide contains the remaining code needed to complete the Super Admin management feature.

## Already Completed ✅

1. API routes in `src/utils/routes.ts`
2. API functions in `src/services/api.ts`
3. JWT decoding in `getCurrentUser()`
4. `AuthContext` updated with `currentAdmin` and `isSuperAdmin`

## Remaining Implementation

### 1. Create SuperAdminAdminsPage

Create `src/pages/Admin/SuperAdminAdminsPage.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminGetAdmins,
  superAdminDeleteAdmin,
  superAdminConfirmAdmin,
  superAdminUnconfirmAdmin,
} from "../../services/api";
import AdminFormModal from "../../components/AdminFormModal";

interface Admin {
  id: number;
  email: string;
  confirmed: boolean;
  tenant_id: number | null;
  tenant: {
    id: number;
    name: string;
    slug: string;
  } | null;
  created_at: string;
}

const SuperAdminAdminsPage = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tenantFilter, setTenantFilter] = useState("");
  const [confirmedFilter, setConfirmedFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (tenantFilter) params.tenant_id = tenantFilter;
      if (confirmedFilter) params.confirmed = confirmedFilter;

      const response = await superAdminGetAdmins(params);
      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [search, tenantFilter, confirmedFilter]);

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("super_admin.admins.delete_confirm"))) return;

    try {
      await superAdminDeleteAdmin(id);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await superAdminConfirmAdmin(id);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to confirm admin:", error);
    }
  };

  const handleUnconfirm = async (id: number) => {
    if (!window.confirm(t("super_admin.admins.unconfirm_confirm"))) return;

    try {
      await superAdminUnconfirmAdmin(id);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to unconfirm admin:", error);
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
    fetchAdmins();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("super_admin.admins.title")}</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t("super_admin.admins.create_new")}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder={t("super_admin.admins.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <select
          value={tenantFilter}
          onChange={(e) => setTenantFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">{t("super_admin.admins.all_tenants")}</option>
          {/* TODO: Load tenants from API */}
        </select>
        <select
          value={confirmedFilter}
          onChange={(e) => setConfirmedFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">{t("super_admin.admins.all_statuses")}</option>
          <option value="true">{t("super_admin.admins.confirmed")}</option>
          <option value="false">{t("super_admin.admins.unconfirmed")}</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">{t("common.loading")}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">{t("super_admin.admins.email")}</th>
                <th className="px-6 py-3 text-left">{t("super_admin.admins.tenant")}</th>
                <th className="px-6 py-3 text-left">{t("super_admin.admins.status")}</th>
                <th className="px-6 py-3 text-left">{t("super_admin.admins.created_at")}</th>
                <th className="px-6 py-3 text-left">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">
                    {admin.tenant ? admin.tenant.name : (
                      <span className="text-purple-600 font-semibold">
                        {t("super_admin.admins.super_admin")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {admin.confirmed ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {t("super_admin.admins.confirmed")}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        {t("super_admin.admins.unconfirmed")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {t("common.edit")}
                      </button>
                      {admin.confirmed ? (
                        <button
                          onClick={() => handleUnconfirm(admin.id)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          {t("super_admin.admins.unconfirm")}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConfirm(admin.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          {t("super_admin.admins.confirm")}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AdminFormModal
          admin={editingAdmin}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SuperAdminAdminsPage;
```

### 2. Create AdminFormModal Component

Create `src/components/AdminFormModal.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminCreateAdmin,
  superAdminUpdateAdmin,
  superAdminGetTenants,
} from "../services/api";

interface Tenant {
  id: number;
  name: string;
  slug: string;
  active: boolean;
}

interface AdminFormModalProps {
  admin: any | null;
  onClose: () => void;
}

const AdminFormModal = ({ admin, onClose }: AdminFormModalProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [tenantId, setTenantId] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchTenants();
    if (admin) {
      setEmail(admin.email);
      setTenantId(admin.tenant_id);
      setConfirmed(admin.confirmed);
    }
  }, [admin]);

  const fetchTenants = async () => {
    try {
      const response = await superAdminGetTenants();
      setTenants(response.data.tenants);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const newErrors: string[] = [];
    if (!email) newErrors.push(t("super_admin.admins.errors.email_required"));
    if (!admin && !password) newErrors.push(t("super_admin.admins.errors.password_required"));
    if (password && password !== passwordConfirmation) {
      newErrors.push(t("super_admin.admins.errors.password_mismatch"));
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const data: any = {
        email,
        tenant_id: tenantId === 0 ? null : tenantId,
        confirmed,
      };

      if (password) {
        data.password = password;
        data.password_confirmation = passwordConfirmation;
      }

      if (admin) {
        await superAdminUpdateAdmin(admin.id, data);
      } else {
        await superAdminCreateAdmin(data);
      }

      onClose();
    } catch (error: any) {
      setErrors([
        error.response?.data?.error || t("super_admin.admins.errors.generic"),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {admin
            ? t("super_admin.admins.edit_admin")
            : t("super_admin.admins.create_admin")}
        </h2>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t("super_admin.admins.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t("super_admin.admins.password")}
              {admin && <span className="text-gray-500 text-xs ml-2">({t("super_admin.admins.leave_blank")})</span>}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required={!admin}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t("super_admin.admins.password_confirmation")}
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required={!!password}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t("super_admin.admins.tenant")}
            </label>
            <select
              value={tenantId === null ? 0 : tenantId}
              onChange={(e) => setTenantId(e.target.value === "0" ? null : Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value="0">{t("super_admin.admins.super_admin")}</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">{t("super_admin.admins.confirmed")}</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? t("common.saving") : t("common.save")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormModal;
```

### 3. Add Routes to App.tsx

Find the admin routes section and add super admin routes:

```tsx
// Add this import at the top
import SuperAdminAdminsPage from "./pages/Admin/SuperAdminAdminsPage";

// Add these routes in the admin section
<Route path="/backoffice/super-admin/admins" element={
  <SuperAdminRoute>
    <SuperAdminAdminsPage />
  </SuperAdminRoute>
} />
```

### 4. Create SuperAdminRoute Protection Component

Create `src/components/SuperAdminRoute.tsx`:

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SuperAdminRouteProps {
  children: React.ReactNode;
}

const SuperAdminRoute = ({ children }: SuperAdminRouteProps) => {
  const { currentAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentAdmin?.isSuperAdmin) {
    return <Navigate to="/backoffice" replace />;
  }

  return <>{children}</>;
};

export default SuperAdminRoute;
```

### 5. Update Navigation

Find your admin navigation component and add:

```tsx
import { useAuth } from "../context/AuthContext";

// Inside your navigation component:
const { currentAdmin } = useAuth();

// Add this section in your nav:
{currentAdmin?.isSuperAdmin && (
  <div className="mt-4 pt-4 border-t">
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
      {t("super_admin.title")}
    </h3>
    <Link
      to="/backoffice/super-admin/admins"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      {t("super_admin.admins.title")}
    </Link>
  </div>
)}
```

### 6. Add Translations

Add to your translation files:

**English (`src/locales/en.json`):**
```json
{
  "super_admin": {
    "title": "Super Admin",
    "admins": {
      "title": "Admin Management",
      "create_new": "Create New Admin",
      "create_admin": "Create Admin",
      "edit_admin": "Edit Admin",
      "email": "Email",
      "password": "Password",
      "password_confirmation": "Confirm Password",
      "tenant": "Tenant",
      "super_admin": "Super Admin",
      "status": "Status",
      "confirmed": "Confirmed",
      "unconfirmed": "Not Confirmed",
      "created_at": "Created",
      "all_tenants": "All Tenants",
      "all_statuses": "All Statuses",
      "search_placeholder": "Search by email...",
      "delete_confirm": "Are you sure you want to delete this admin?",
      "unconfirm_confirm": "Are you sure you want to unconfirm this admin?",
      "confirm": "Confirm",
      "unconfirm": "Unconfirm",
      "leave_blank": "leave blank to keep current",
      "errors": {
        "email_required": "Email is required",
        "password_required": "Password is required",
        "password_mismatch": "Passwords do not match",
        "generic": "An error occurred. Please try again."
      }
    }
  },
  "common": {
    "loading": "Loading...",
    "saving": "Saving...",
    "save": "Save",
    "cancel": "Cancel",
    "edit": "Edit",
    "delete": "Delete",
    "actions": "Actions"
  }
}
```

**Portuguese (`src/locales/pt.json`):**
```json
{
  "super_admin": {
    "title": "Super Administrador",
    "admins": {
      "title": "Gestão de Administradores",
      "create_new": "Criar Novo Administrador",
      "create_admin": "Criar Administrador",
      "edit_admin": "Editar Administrador",
      "email": "Email",
      "password": "Palavra-passe",
      "password_confirmation": "Confirmar Palavra-passe",
      "tenant": "Inquilino",
      "super_admin": "Super Administrador",
      "status": "Estado",
      "confirmed": "Confirmado",
      "unconfirmed": "Não Confirmado",
      "created_at": "Criado",
      "all_tenants": "Todos os Inquilinos",
      "all_statuses": "Todos os Estados",
      "search_placeholder": "Pesquisar por email...",
      "delete_confirm": "Tem certeza que deseja eliminar este administrador?",
      "unconfirm_confirm": "Tem certeza que deseja desconfirmar este administrador?",
      "confirm": "Confirmar",
      "unconfirm": "Desconfirmar",
      "leave_blank": "deixe em branco para manter atual",
      "errors": {
        "email_required": "Email é obrigatório",
        "password_required": "Palavra-passe é obrigatória",
        "password_mismatch": "As palavras-passe não correspondem",
        "generic": "Ocorreu um erro. Por favor tente novamente."
      }
    }
  },
  "common": {
    "loading": "Carregando...",
    "saving": "Guardando...",
    "save": "Guardar",
    "cancel": "Cancelar",
    "edit": "Editar",
    "delete": "Eliminar",
    "actions": "Ações"
  }
}
```

## Testing Checklist

- [ ] Super admin can access `/backoffice/super-admin/admins`
- [ ] Non-super admin is redirected away from super admin routes
- [ ] Can create new admin (with/without tenant)
- [ ] Can edit existing admin
- [ ] Can delete admin (except self)
- [ ] Can confirm/unconfirm admins
- [ ] Search filters work correctly
- [ ] Tenant filter works correctly
- [ ] Status filter works correctly
- [ ] Super admin indicator shows in navigation
- [ ] Translations work in both languages

## Next Steps

1. Copy the components and update files as shown above
2. Test locally with the seeded super admin: `superadmin@example.com` / `password123`
3. Test tenant admin access restrictions
4. Deploy and test in production
