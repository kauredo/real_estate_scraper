import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminCreateAdmin,
  superAdminUpdateAdmin,
  superAdminGetTenants,
} from "../../services/api";
import { Modal, Input, Select, Button } from "../admin/ui";

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
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        admin
          ? t("super_admin.admins.edit_admin")
          : t("super_admin.admins.create_admin")
      }
    >
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label={t("super_admin.admins.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4"
        />

        <Input
          type="password"
          label={t("super_admin.admins.password")}
          helperText={admin ? `(${t("super_admin.admins.leave_blank")})` : undefined}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!admin}
          className="mb-4"
        />

        <Input
          type="password"
          label={t("super_admin.admins.password_confirmation")}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required={!!password}
          className="mb-4"
        />

        <Select
          label={t("super_admin.admins.tenant")}
          value={tenantId === null ? 0 : tenantId}
          onChange={(e) =>
            setTenantId(e.target.value === "0" ? null : Number(e.target.value))
          }
          className="mb-4"
        >
          <option value="0">{t("super_admin.admins.super_admin")}</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </Select>

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
          <Button type="submit" isLoading={loading} className="flex-1">
            {t("common.save")}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            {t("common.cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminFormModal;
