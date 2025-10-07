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

interface Tenant {
  id: number;
  name: string;
  slug: string;
  active: boolean;
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
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <select
          value={tenantFilter}
          onChange={(e) => setTenantFilter(e.target.value)}
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">{t("super_admin.admins.all_tenants")}</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
        <select
          value={confirmedFilter}
          onChange={(e) => setConfirmedFilter(e.target.value)}
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">{t("super_admin.admins.all_statuses")}</option>
          <option value="true">{t("super_admin.admins.confirmed")}</option>
          <option value="false">{t("super_admin.admins.unconfirmed")}</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8 dark:text-white">{t("common.loading")}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left dark:text-white">
                  {t("super_admin.admins.email")}
                </th>
                <th className="px-6 py-3 text-left dark:text-white">
                  {t("super_admin.admins.tenant")}
                </th>
                <th className="px-6 py-3 text-left dark:text-white">
                  {t("super_admin.admins.status")}
                </th>
                <th className="px-6 py-3 text-left dark:text-white">
                  {t("super_admin.admins.created_at")}
                </th>
                <th className="px-6 py-3 text-left dark:text-white">
                  {t("common.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 dark:text-white">{admin.email}</td>
                  <td className="px-6 py-4 dark:text-white">
                    {admin.tenant ? (
                      admin.tenant.name
                    ) : (
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        {t("super_admin.admins.super_admin")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {admin.confirmed ? (
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm">
                        {t("super_admin.admins.confirmed")}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded text-sm">
                        {t("super_admin.admins.unconfirmed")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {t("common.edit")}
                      </button>
                      {admin.confirmed ? (
                        <button
                          onClick={() => handleUnconfirm(admin.id)}
                          className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          {t("super_admin.admins.unconfirm")}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConfirm(admin.id)}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          {t("super_admin.admins.confirm")}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {admins.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {t("super_admin.admins.no_admins")}
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <AdminFormModal admin={editingAdmin} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SuperAdminAdminsPage;
