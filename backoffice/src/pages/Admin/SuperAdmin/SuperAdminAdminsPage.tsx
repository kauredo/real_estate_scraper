import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminGetAdmins,
  superAdminDeleteAdmin,
  superAdminConfirmAdmin,
  superAdminUnconfirmAdmin,
  superAdminGetTenants,
} from "../../../services/api";
import AdminFormModal from "../../../components/SuperAdmin/AdminFormModal";
import {
  LoadingSpinner,
  AdminTable,
  Input,
  Select,
  Button,
} from "../../../components/admin/ui";

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
  [key: string]:
    | string
    | number
    | boolean
    | null
    | { id: number; name: string; slug: string }
    | undefined;
}

interface Tenant {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  [key: string]: string | number | boolean;
}

const SuperAdminAdminsPage = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
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

  const fetchTenants = async () => {
    try {
      const response = await superAdminGetTenants();
      setTenants(response.data.tenants || []);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

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
        <h1 className="text-3xl font-bold dark:text-white">
          {t("super_admin.admins.title")}
        </h1>
        <Button onClick={handleCreate}>
          {t("super_admin.admins.create_new")}
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          placeholder={t("super_admin.admins.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={tenantFilter}
          onChange={(e) => setTenantFilter(e.target.value)}
        >
          <option value="">{t("super_admin.admins.all_tenants")}</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </Select>
        <Select
          value={confirmedFilter}
          onChange={(e) => setConfirmedFilter(e.target.value)}
        >
          <option value="">{t("super_admin.admins.all_statuses")}</option>
          <option value="true">{t("super_admin.admins.confirmed")}</option>
          <option value="false">{t("super_admin.admins.unconfirmed")}</option>
        </Select>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : admins.length > 0 ? (
        <AdminTable
          columns={[
            {
              key: "email",
              label: t("super_admin.admins.email"),
              width: "w-1/4",
            },
            {
              key: "tenant",
              label: t("super_admin.admins.tenant"),
              width: "w-1/4",
              render: (_: any, admin: Admin) =>
                admin.tenant ? (
                  admin.tenant.name
                ) : (
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    {t("super_admin.admins.super_admin")}
                  </span>
                ),
            },
            {
              key: "confirmed",
              label: t("super_admin.admins.status"),
              width: "w-1/6",
              render: (value: unknown) =>
                (value as boolean) ? (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm">
                    {t("super_admin.admins.confirmed")}
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded text-sm">
                    {t("super_admin.admins.unconfirmed")}
                  </span>
                ),
            },
            {
              key: "created_at",
              label: t("super_admin.admins.created_at"),
              width: "w-1/6",
              render: (value: unknown) =>
                new Date(value as string).toLocaleDateString(),
            },
            {
              key: "actions",
              label: t("common.actions"),
              width: "w-1/6",
              render: (_: unknown, admin: Admin) => (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(admin)}
                    variant="link"
                    size="sm"
                  >
                    {t("common.edit")}
                  </Button>
                  {admin.confirmed ? (
                    <Button
                      onClick={() => handleUnconfirm(admin.id)}
                      variant="link"
                      size="sm"
                      className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      {t("super_admin.admins.unconfirm")}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleConfirm(admin.id)}
                      variant="link"
                      size="sm"
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                      {t("super_admin.admins.confirm")}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(admin.id)}
                    variant="link"
                    size="sm"
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {t("common.delete")}
                  </Button>
                </div>
              ),
            },
          ]}
          data={admins}
        />
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t("super_admin.admins.no_admins")}
        </div>
      )}

      {isModalOpen && (
        <AdminFormModal admin={editingAdmin} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SuperAdminAdminsPage;
