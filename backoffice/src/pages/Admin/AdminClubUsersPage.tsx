import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { adminGetClubUsers, adminExportClubUsers } from "../../services/api";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminTable,
  EmptyState,
  Button,
  Select,
} from "../../components/admin/ui";

interface ClubUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

const AdminClubUsersPage = () => {
  const { t } = useTranslation();
  const [clubUsers, setClubUsers] = useState<ClubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchClubUsers = async () => {
    try {
      setLoading(true);
      const response = await adminGetClubUsers();
      setClubUsers(response.data.club_users || []);
    } catch (error) {
      console.error("Error fetching club users:", error);
      setClubUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubUsers();
  }, []);

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const response = await adminExportClubUsers();

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = `club_users_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredUsers = statusFilter
    ? clubUsers.filter((user) => user.status === statusFilter)
    : clubUsers;

  const columns = [
    {
      key: "name",
      label: t("admin.club_users.name"),
      width: "w-1/4",
    },
    {
      key: "email",
      label: t("admin.club_users.email"),
      width: "w-1/4",
    },
    {
      key: "phone",
      label: t("admin.club_users.phone"),
      width: "w-1/6",
    },
    {
      key: "status",
      label: t("admin.club_users.status"),
      width: "w-1/6",
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-sm rounded-full ${
            value === "approved"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "created_at",
      label: t("admin.club_users.joined_at"),
      width: "w-1/6",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.club_users.title")}
        count={filteredUsers.length}
        countLabel={t("admin.club_users.totalCount", {
          count: filteredUsers.length,
        })}
      >
        <div className="flex gap-3 mt-4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">{t("admin.club_users.all_statuses")}</option>
            <option value="approved">{t("admin.club_users.approved")}</option>
            <option value="pending">{t("admin.club_users.pending")}</option>
          </Select>
          <Button
            onClick={handleExportCSV}
            disabled={clubUsers.length === 0}
            isLoading={exporting}
            className="flex items-center gap-2"
          >
            <i className="fas fa-file-export"></i>
            <span>{t("admin.club_users.export_csv")}</span>
          </Button>
        </div>
      </AdminPageHeader>

      {filteredUsers.length > 0 ? (
        <AdminTable columns={columns} data={filteredUsers} />
      ) : (
        <EmptyState message={t("admin.club_users.empty")} />
      )}
    </div>
  );
};

export default AdminClubUsersPage;
