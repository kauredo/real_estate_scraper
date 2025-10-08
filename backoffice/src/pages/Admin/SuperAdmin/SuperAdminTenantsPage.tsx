import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminGetTenants,
  superAdminDeleteTenant,
  superAdminToggleActiveTenant,
  superAdminRotateApiKey,
} from "../../../services/api";
import TenantFormModal from "../../../components/SuperAdmin/TenantFormModal";
import { LoadingSpinner, AdminTable } from "../../../components/admin/ui";

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  active: boolean;
  contact_email: string | null;
  created_at: string;
  enabled_features: string[];
}

const SuperAdminTenantsPage = () => {
  const { t } = useTranslation();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [rotatingApiKey, setRotatingApiKey] = useState<number | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await superAdminGetTenants();
      let filteredTenants = response.data.tenants || [];

      // Apply search filter
      if (search) {
        filteredTenants = filteredTenants.filter(
          (tenant: Tenant) =>
            tenant.name.toLowerCase().includes(search.toLowerCase()) ||
            tenant.slug.toLowerCase().includes(search.toLowerCase()) ||
            (tenant.domain &&
              tenant.domain.toLowerCase().includes(search.toLowerCase())),
        );
      }

      // Apply active filter
      if (activeFilter === "true") {
        filteredTenants = filteredTenants.filter(
          (tenant: Tenant) => tenant.active,
        );
      } else if (activeFilter === "false") {
        filteredTenants = filteredTenants.filter(
          (tenant: Tenant) => !tenant.active,
        );
      }

      setTenants(filteredTenants);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [search, activeFilter]);

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("super_admin.tenants.delete_confirm"))) return;

    try {
      await superAdminDeleteTenant(id);
      fetchTenants();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        t("super_admin.tenants.delete_error");
      alert(errorMessage);
      console.error("Failed to delete tenant:", error);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await superAdminToggleActiveTenant(id);
      fetchTenants();
    } catch (error) {
      console.error("Failed to toggle tenant status:", error);
    }
  };

  const handleRotateApiKey = async (id: number, name: string) => {
    if (
      !window.confirm(t("super_admin.tenants.rotate_api_key_confirm", { name }))
    )
      return;

    setRotatingApiKey(id);
    try {
      const response = await superAdminRotateApiKey(id);
      const newApiKey = response.data.api_key;
      alert(
        t("super_admin.tenants.new_api_key", { apiKey: newApiKey }) +
          "\n\n" +
          t("super_admin.tenants.api_key_warning"),
      );
      fetchTenants();
    } catch (error) {
      console.error("Failed to rotate API key:", error);
    } finally {
      setRotatingApiKey(null);
    }
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingTenant(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTenant(null);
    fetchTenants();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">
          {t("super_admin.tenants.title")}
        </h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t("super_admin.tenants.create_new")}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t("super_admin.tenants.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">{t("super_admin.tenants.all_statuses")}</option>
          <option value="true">{t("super_admin.tenants.active")}</option>
          <option value="false">{t("super_admin.tenants.inactive")}</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : tenants.length > 0 ? (
        <AdminTable
          columns={[
            {
              key: "name",
              label: t("super_admin.tenants.name"),
              width: "w-1/6",
            },
            {
              key: "slug",
              label: t("super_admin.tenants.slug"),
              width: "w-1/6",
              render: (value: string) => (
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  {value}
                </code>
              ),
            },
            {
              key: "domain",
              label: t("super_admin.tenants.domain"),
              width: "w-1/6",
              render: (value: string | null) =>
                value || (
                  <span className="text-gray-400 italic">
                    {t("super_admin.tenants.no_domain")}
                  </span>
                ),
            },
            {
              key: "active",
              label: t("super_admin.tenants.status"),
              width: "w-1/6",
              render: (value: boolean) =>
                value ? (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm">
                    {t("super_admin.tenants.active")}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-sm">
                    {t("super_admin.tenants.inactive")}
                  </span>
                ),
            },
            {
              key: "enabled_features",
              label: t("super_admin.tenants.features"),
              width: "w-1/6",
              render: (features: string[]) => (
                <div className="flex flex-wrap gap-1">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs"
                    >
                      {t(`super_admin.tenants.feature_${feature}`)}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              key: "actions",
              label: t("common.actions"),
              width: "w-1/6",
              render: (_: any, tenant: Tenant) => (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(tenant)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-left"
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => handleToggleActive(tenant.id)}
                    className={
                      tenant.active
                        ? "text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 text-left"
                        : "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-left"
                    }
                  >
                    {tenant.active
                      ? t("super_admin.tenants.deactivate")
                      : t("super_admin.tenants.activate")}
                  </button>
                  <button
                    onClick={() => handleRotateApiKey(tenant.id, tenant.name)}
                    disabled={rotatingApiKey === tenant.id}
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-left disabled:opacity-50"
                  >
                    {rotatingApiKey === tenant.id
                      ? t("super_admin.tenants.rotating")
                      : t("super_admin.tenants.rotate_api_key")}
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-left"
                  >
                    {t("common.delete")}
                  </button>
                </div>
              ),
            },
          ]}
          data={tenants}
        />
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t("super_admin.tenants.no_tenants")}
        </div>
      )}

      {isModalOpen && (
        <TenantFormModal tenant={editingTenant} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SuperAdminTenantsPage;
