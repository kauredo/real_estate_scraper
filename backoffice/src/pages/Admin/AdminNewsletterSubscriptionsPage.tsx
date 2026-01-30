import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { adminGetNewsletterSubscriptions } from "../../services/api";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminTable,
  EmptyState,
  Button,
} from "../../components/admin/ui";

interface NewsletterSubscription {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  created_at: string;
}

const AdminNewsletterSubscriptionsPage = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await adminGetNewsletterSubscriptions();
      setSubscriptions(response.data.newsletter_subscriptions || []);
    } catch (error) {
      console.error("Error fetching newsletter subscriptions:", error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Subscribed At"];
    const rows = subscriptions.map((sub) => [
      `${sub.user.first_name} ${sub.user.last_name}`,
      sub.user.email,
      new Date(sub.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter_subscriptions_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      key: "name",
      label: t("admin.newsletter.name"),
      width: "w-1/3",
      render: (_: unknown, sub: unknown) => {
        const subscription = sub as NewsletterSubscription;
        return `${subscription.user.first_name} ${subscription.user.last_name}`;
      },
    },
    {
      key: "email",
      label: t("admin.newsletter.email"),
      width: "w-1/3",
      render: (_: unknown, sub: unknown) => {
        const subscription = sub as NewsletterSubscription;
        return subscription.user.email;
      },
    },
    {
      key: "created_at",
      label: t("admin.newsletter.subscribed_at"),
      width: "w-1/3",
      render: (value: unknown) =>
        new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <div className="w-full shadow-md rounded px-4 sm:px-6 lg:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.newsletter.title")}
        count={subscriptions.length}
        countLabel={t("admin.newsletter.totalCount", {
          count: subscriptions.length,
        })}
      >
        <Button
          onClick={handleExportCSV}
          disabled={subscriptions.length === 0}
          className="mt-4 flex items-center gap-2"
        >
          <i className="fas fa-file-export"></i>
          <span>{t("admin.newsletter.export_csv")}</span>
        </Button>
      </AdminPageHeader>

      {subscriptions.length > 0 ? (
        <AdminTable
          columns={columns}
          data={subscriptions as unknown as Record<string, unknown>[]}
        />
      ) : (
        <EmptyState message={t("admin.newsletter.empty")} />
      )}
    </div>
  );
};

export default AdminNewsletterSubscriptionsPage;
