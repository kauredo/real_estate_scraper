import React from "react";
import { useTenant } from "../../context/TenantContext";
import { useTranslation } from "react-i18next";
import { Select } from "../admin/ui";

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
    <Select
      value={selectedTenantId || ""}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedTenantId(value === "" ? null : parseInt(value));
        // Reload the page to fetch data for the selected tenant
        window.location.reload();
      }}
    >
      <option value="">{t("admin.tenant_selector.all_tenants")}</option>
      {availableTenants.map((tenant) => (
        <option key={tenant.id} value={tenant.id}>
          {tenant.name}
        </option>
      ))}
    </Select>
  );
};

export default TenantSelector;
