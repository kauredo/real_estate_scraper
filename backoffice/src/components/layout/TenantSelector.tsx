import React from "react";
import { useTenant } from "../../context/TenantContext";
import { useTranslation } from "react-i18next";

const TenantSelector: React.FC = () => {
  const { t } = useTranslation();
  const {
    isSuperAdmin,
    availableTenants,
    selectedTenantId,
    setSelectedTenantId,
  } = useTenant();

  // Only show for super admins
  if (!isSuperAdmin) {
    return null;
  }

  return (
    <div className="relative">
      <select
        value={selectedTenantId || ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedTenantId(value === "" ? null : parseInt(value));
          // Reload the page to fetch data for the selected tenant
          window.location.reload();
        }}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-3 pr-8 py-2 transition-colors"
      >
        <option value="">{t("admin.tenant_selector.all_tenants")}</option>
        {availableTenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </select>

      {/* Dropdown icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 dark:text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default TenantSelector;
