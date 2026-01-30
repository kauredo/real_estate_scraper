import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListingsTable from "../../components/admin/ListingsTable";
import ListingComplexesTable from "../../components/admin/ListingComplexesTable";
import TestimonialsManagement from "../../components/admin/TestimonialsManagement";
import PhotosManagement from "../../components/admin/PhotosManagement";
import { Button } from "../../components/admin/ui";

type ActiveTab = "listings" | "complexes" | "testimonials" | "photos";

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("listings");

  const tabs = [
    { id: "listings", label: t("admin.dashboard.tabs.listings"), component: <ListingsTable /> },
    {
      id: "complexes",
      label: t("admin.dashboard.tabs.complexes"),
      component: <ListingComplexesTable />,
    },
    {
      id: "testimonials",
      label: t("admin.dashboard.tabs.testimonials"),
      component: <TestimonialsManagement />,
    },
    { id: "photos", label: t("admin.dashboard.tabs.photos"), component: <PhotosManagement /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-neutral-900">
              {t("admin.dashboard.admin_panel")}
            </h1>
            <div className="text-sm text-neutral-500">{t("admin.dashboard.content_management")}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                variant="link"
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
