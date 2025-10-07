import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminCreateAdmin,
  superAdminUpdateAdmin,
  superAdminGetTenants,
} from "../../services/api";

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
      console.log("Tenants response:", response.data);
      setTenants(response.data.tenants || []);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
      setTenants([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const newErrors: string[] = [];
    if (!email) newErrors.push(t("super_admin.admins.errors.email_required"));
    if (!admin && !password)
      newErrors.push(t("super_admin.admins.errors.password_required"));
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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
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
            <label className="block text-sm font-medium mb-2 dark:text-white">
              {t("super_admin.admins.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-white">
              {t("super_admin.admins.password")}
              {admin && (
                <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                  ({t("super_admin.admins.leave_blank")})
                </span>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required={!admin}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-white">
              {t("super_admin.admins.password_confirmation")}
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required={!!password}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-white">
              {t("super_admin.admins.tenant")}
            </label>
            <select
              value={tenantId === null ? 0 : tenantId}
              onChange={(e) =>
                setTenantId(
                  e.target.value === "0" ? null : Number(e.target.value),
                )
              }
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <span className="text-sm dark:text-white">
                {t("super_admin.admins.confirmed")}
              </span>
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
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
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
