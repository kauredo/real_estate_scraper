import React, { useState } from "react";
import ListingsTable from "../../components/admin/ListingsTable";
import ListingComplexesTable from "../../components/admin/ListingComplexesTable";
import TestimonialsManagement from "../../components/admin/TestimonialsManagement";
import PhotosManagement from "../../components/admin/PhotosManagement";

type ActiveTab = "listings" | "complexes" | "testimonials" | "photos";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("listings");

  const tabs = [
    { id: "listings", label: "Imóveis", component: <ListingsTable /> },
    {
      id: "complexes",
      label: "Empreendimentos",
      component: <ListingComplexesTable />,
    },
    {
      id: "testimonials",
      label: "Testemunhos",
      component: <TestimonialsManagement />,
    },
    { id: "photos", label: "Fotos", component: <PhotosManagement /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Painel de Administração
            </h1>
            <div className="text-sm text-gray-500">Gestão de conteúdos</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
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
