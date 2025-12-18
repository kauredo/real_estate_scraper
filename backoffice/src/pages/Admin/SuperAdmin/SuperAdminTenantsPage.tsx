import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminGetTenants,
  superAdminDeleteTenant,
  superAdminToggleActiveTenant,
  superAdminRotateApiKey,
} from "../../../services/api";
import TenantFormModal from "../../../components/SuperAdmin/TenantFormModal";
import {
  LoadingSpinner,
  AdminTable,
  Input,
  Select,
  Button,
} from "../../../components/admin/ui";

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  active: boolean;
  contact_email: string | null;
  agency_name: string | null;
  website_url: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  enabled_features: string[];
  [key: string]: string | number | boolean | string[] | null;
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
        <Button onClick={handleCreate}>
          {t("super_admin.tenants.create_new")}
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={t("super_admin.tenants.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="">{t("super_admin.tenants.all_statuses")}</option>
          <option value="true">{t("super_admin.tenants.active")}</option>
          <option value="false">{t("super_admin.tenants.inactive")}</option>
        </Select>
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
              render: (value: unknown) => (
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  {value as string}
                </code>
              ),
            },
            {
              key: "domain",
              label: t("super_admin.tenants.domain"),
              width: "w-1/6",
              render: (value: unknown) =>
                (value as string | null) || (
                  <span className="text-gray-400 italic">
                    {t("super_admin.tenants.no_domain")}
                  </span>
                ),
            },
            {
              key: "active",
              label: t("super_admin.tenants.status"),
              width: "w-1/6",
              render: (value: unknown) =>
                (value as boolean) ? (
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
              render: (features: unknown) => (
                <div className="flex flex-wrap gap-1">
                  {(features as string[]).map((feature) => (
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
              render: (_: unknown, tenant: Tenant) => (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleEdit(tenant)}
                    variant="link"
                    size="sm"
                    className="justify-start"
                  >
                    {t("common.edit")}
                  </Button>
                  <Button
                    onClick={() => handleToggleActive(tenant.id)}
                    variant="link"
                    size="sm"
                    className={
                      tenant.active
                        ? "text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 justify-start"
                        : "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 justify-start"
                    }
                  >
                    {tenant.active
                      ? t("super_admin.tenants.deactivate")
                      : t("super_admin.tenants.activate")}
                  </Button>
                  <Button
                    onClick={() => handleRotateApiKey(tenant.id, tenant.name)}
                    disabled={rotatingApiKey === tenant.id}
                    variant="link"
                    size="sm"
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 justify-start"
                  >
                    {rotatingApiKey === tenant.id
                      ? t("super_admin.tenants.rotating")
                      : t("super_admin.tenants.rotate_api_key")}
                  </Button>
                  <Button
                    onClick={() => handleDelete(tenant.id)}
                    variant="link"
                    size="sm"
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 justify-start"
                  >
                    {t("common.delete")}
                  </Button>
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
