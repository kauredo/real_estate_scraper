import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminCreateTenant,
  superAdminUpdateTenant,
  superAdminUpdateTenantFeatures,
} from "../../services/api";
import ButtonSpinner from "../loading/ButtonSpinner";
import { useNotifications } from "../../context/NotificationContext";

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  active: boolean;
  contact_email: string | null;
  scraper_source_url: string | null;
  enabled_features: string[];
}

interface TenantFormModalProps {
  tenant: Tenant | null;
  onClose: () => void;
}

const TenantFormModal = ({ tenant, onClose }: TenantFormModalProps) => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useNotifications();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [scraperSourceUrl, setScraperSourceUrl] = useState("");
  const [active, setActive] = useState(true);

  // Feature flags
  const [blogEnabled, setBlogEnabled] = useState(true);
  const [clubEnabled, setClubEnabled] = useState(false);
  const [testimonialsEnabled, setTestimonialsEnabled] = useState(true);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [listingComplexesEnabled, setListingComplexesEnabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

  useEffect(() => {
    if (tenant) {
      setName(tenant.name);
      setSlug(tenant.slug);
      setDomain(tenant.domain || "");
      setContactEmail(tenant.contact_email || "");
      setScraperSourceUrl(tenant.scraper_source_url || "");
      setActive(tenant.active);

      // Set features
      setBlogEnabled(tenant.enabled_features.includes("blog"));
      setClubEnabled(tenant.enabled_features.includes("club"));
      setTestimonialsEnabled(tenant.enabled_features.includes("testimonials"));
      setNewsletterEnabled(tenant.enabled_features.includes("newsletter"));
      setListingComplexesEnabled(
        tenant.enabled_features.includes("listing_complexes"),
      );
    }
  }, [tenant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const newErrors: string[] = [];
    if (!name) newErrors.push(t("super_admin.tenants.errors.name_required"));
    if (!slug) newErrors.push(t("super_admin.tenants.errors.slug_required"));
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      newErrors.push(t("super_admin.tenants.errors.slug_format"));
    }
    if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      newErrors.push(t("super_admin.tenants.errors.email_format"));
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const tenantData = {
        name,
        slug,
        domain: domain || null,
        contact_email: contactEmail || null,
        scraper_source_url: scraperSourceUrl || null,
        active,
      };

      const featuresData = {
        blog_enabled: blogEnabled,
        club_enabled: clubEnabled,
        testimonials_enabled: testimonialsEnabled,
        newsletter_enabled: newsletterEnabled,
        listing_complexes_enabled: listingComplexesEnabled,
      };

      if (tenant) {
        // Update existing tenant
        await superAdminUpdateTenant(tenant.id, tenantData);
        await superAdminUpdateTenantFeatures(tenant.id, featuresData);
        showSuccess(t("super_admin.tenants.success.updated"));
      } else {
        // Create new tenant
        const response = await superAdminCreateTenant({
          ...tenantData,
          features: featuresData,
        });

        // Show API key for new tenant
        if (response.data.tenant?.api_key) {
          setNewApiKey(response.data.tenant.api_key);
          setShowApiKey(true);
          showSuccess(t("super_admin.tenants.success.created"));
          return; // Don't close yet, show API key first
        }
      }

      onClose();
    } catch (error: any) {
      const errorMessages = error.response?.data?.errors || [
          error.response?.data?.error,
        ] || [t("super_admin.tenants.errors.generic")];
      setErrors(errorMessages);
      showError(errorMessages[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWithApiKey = () => {
    setShowApiKey(false);
    setNewApiKey("");
    onClose();
  };

  if (showApiKey) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
            {t("super_admin.tenants.created_success")}
          </h2>

          <div className="mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {t("super_admin.tenants.api_key_label")}
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded break-all font-mono text-sm">
              {newApiKey}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
              {t("super_admin.tenants.api_key_save_warning")}
            </p>
          </div>

          <button
            onClick={handleCloseWithApiKey}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t("common.close")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {tenant
            ? t("super_admin.tenants.edit_tenant")
            : t("super_admin.tenants.create_tenant")}
        </h2>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              {t("super_admin.tenants.basic_info")}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                {t("super_admin.tenants.name")} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                {t("super_admin.tenants.slug")} *
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({t("super_admin.tenants.slug_hint")})
                </span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                pattern="^[a-z0-9-]+$"
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                {t("super_admin.tenants.domain")}
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                {t("super_admin.tenants.contact_email")}
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Scraper Source URL
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  (URL where the scraper will find this agent's listings)
                </span>
              </label>
              <input
                type="url"
                value={scraperSourceUrl}
                onChange={(e) => setScraperSourceUrl(e.target.value)}
                placeholder="https://www.kwportugal.pt/pt/agente/Name/12345"
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.active")}
                </span>
              </label>
            </div>
          </div>

          {/* Feature Flags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              {t("super_admin.tenants.features_section")}
            </h3>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={blogEnabled}
                  onChange={(e) => setBlogEnabled(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.feature_blog")}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={clubEnabled}
                  onChange={(e) => setClubEnabled(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.feature_club")}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={testimonialsEnabled}
                  onChange={(e) => setTestimonialsEnabled(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.feature_testimonials")}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newsletterEnabled}
                  onChange={(e) => setNewsletterEnabled(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.feature_newsletter")}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={listingComplexesEnabled}
                  onChange={(e) => setListingComplexesEnabled(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">
                  {t("super_admin.tenants.feature_listing_complexes")}
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading && <ButtonSpinner />}
              {loading ? t("common.saving") : t("common.save")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantFormModal;
