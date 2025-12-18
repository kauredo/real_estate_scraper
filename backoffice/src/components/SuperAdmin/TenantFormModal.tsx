import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  superAdminCreateTenant,
  superAdminUpdateTenant,
  superAdminUpdateTenantFeatures,
} from "../../services/api";
import { Input, Button, Textarea } from "../admin/ui";

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
  enabled_features: string[];
  [key: string]: string | number | boolean | string[] | null;
}

interface TenantFormModalProps {
  tenant: Tenant | null;
  onClose: () => void;
}

const TenantFormModal = ({ tenant, onClose }: TenantFormModalProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
      setAgencyName(tenant.agency_name || "");
      setWebsiteUrl(tenant.website_url || "");
      setPhone(tenant.phone || "");
      setAddress(tenant.address || "");
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
        agency_name: agencyName || null,
        website_url: websiteUrl || null,
        phone: phone || null,
        address: address || null,
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
          return; // Don't close yet, show API key first
        }
      }

      onClose();
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { errors?: string[]; error?: string } };
      };
      const errorMessages = err.response?.data?.errors ||
        [err.response?.data?.error].filter(
          (e): e is string => e !== undefined,
        ) || [t("super_admin.tenants.errors.generic")];
      setErrors(errorMessages);
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

          <Button onClick={handleCloseWithApiKey} fullWidth>
            {t("common.close")}
          </Button>
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
              <Input
                type="text"
                label={`${t("super_admin.tenants.name")} *`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Input
                type="text"
                label={`${t("super_admin.tenants.slug")} *`}
                helperText={`(${t("super_admin.tenants.slug_hint")})`}
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                pattern="^[a-z0-9-]+$"
                className="font-mono"
                required
              />
            </div>

            <div className="mb-4">
              <Input
                type="text"
                label={t("super_admin.tenants.domain")}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
              />
            </div>

            <div className="mb-4">
              <Input
                type="email"
                label={t("super_admin.tenants.contact_email")}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Input
                type="text"
                label={t("super_admin.tenants.agency_name")}
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder="Sofia Galvão Group"
              />
            </div>

            <div className="mb-4">
              <Input
                type="url"
                label={t("super_admin.tenants.website_url")}
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://sofiagalvaogroup.com"
              />
            </div>

            <div className="mb-4">
              <Input
                type="tel"
                label={t("super_admin.tenants.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+351 912 345 678"
              />
            </div>

            <div className="mb-4">
              <Textarea
                label={t("super_admin.tenants.address")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua Example, 123&#10;1000-001 Lisboa"
                rows={3}
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
            <Button type="submit" isLoading={loading} className="flex-1">
              {t("common.save")}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              {t("common.cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantFormModal;
