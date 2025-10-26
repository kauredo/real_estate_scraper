import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { Listing } from "../../utils/interfaces";
import {
  adminGetListings,
  adminUpdateAllListings,
  generatePreviewToken,
} from "../../services/api";
import Flashes from "../../components/shared/Flashes";
import {
  LoadingSpinner,
  AdminCard,
  Pagination,
  Button,
  Select,
  PreviewModal,
} from "../../components/admin/ui";
import { appRoutes } from "../../utils/routes";
import { useTenant } from "../../context/TenantContext";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
  from: number;
  to: number;
}

interface FlashMessage {
  type: string;
  message: string;
}

const AdminListingsPage = () => {
  const { t } = useTranslation();
  const { tenant, isSuperAdmin, selectedTenantId, availableTenants } =
    useTenant();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current_page: 1,
    per_page: 25,
    total_count: 0,
    total_pages: 0,
    from: 1,
    to: 25,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const order = searchParams.get("order") || "order";

  // Get the effective scraper URL (selected tenant for super admins, or current tenant)
  const effectiveScraperUrl = React.useMemo(() => {
    if (isSuperAdmin && selectedTenantId) {
      const selected = availableTenants.find((t) => t.id === selectedTenantId);
      return selected?.scraper_source_url;
    }
    return tenant?.scraper_source_url;
  }, [isSuperAdmin, selectedTenantId, availableTenants, tenant]);

  // For super admins, disable update all when "All Tenants" is selected
  // Also disable if no scraper_source_url is configured
  const canUpdateAll =
    (!isSuperAdmin || selectedTenantId !== null) &&
    effectiveScraperUrl != null;

  const fetchListings = async (page = 1, resetPage = false) => {
    try {
      setLoading(true);
      // Clear any existing flash messages when fetching
      setFlash(null);

      const params = {
        page: resetPage ? 1 : page,
        order,
        per_page: 25,
      };

      const response = await adminGetListings(params);
      setListings(response.data.listings);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setFlash({
        type: "error",
        message: t("admin.listings.fetch_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOrderChange = (newOrder: string) => {
    setSearchParams({ order: newOrder });
    // Reset to page 1 when order changes
    fetchListings(1, true);
  };

  const handleUpdateAll = async () => {
    if (!window.confirm(t("admin.listings.confirmUpdateAll"))) {
      return;
    }

    try {
      setUpdating(true);
      setFlash(null); // Clear any existing flash messages
      await adminUpdateAllListings();
      setFlash({
        type: "success",
        message: t("admin.listings.update_success"),
      });
      await fetchListings(pagination.current_page); // Refresh current page after update
    } catch (error) {
      console.error("Error updating listings:", error);
      setFlash({
        type: "error",
        message: t("admin.listings.update_error"),
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchListings(page);
  };

  const handlePreview = async (listing: Listing) => {
    try {
      const response = await generatePreviewToken("listing", listing.id);
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview: ${listing.title}`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  useEffect(() => {
    // Only fetch on initial mount, order changes are handled by handleOrderChange
    fetchListings(1);
  }, []); // Remove order dependency

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap mb-6 gap-4">
        <Button
          onClick={handleUpdateAll}
          isLoading={updating}
          disabled={!canUpdateAll}
          title={
            !canUpdateAll
              ? isSuperAdmin && selectedTenantId === null
                ? t("admin.listings.select_tenant_first")
                : t("admin.listings.no_scraper_configured")
              : undefined
          }
        >
          {t("admin.listings.updateAll")}
        </Button>

        <Select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="w-full sm:w-auto"
        >
          <option value="order">{t("admin.listings.order.normal")}</option>
          <option value="recent">{t("admin.listings.order.recent")}</option>
          <option value="deleted">{t("admin.listings.order.deleted")}</option>
          <option value="deleted_only">
            {t("admin.listings.order.deletedOnly")}
          </option>
        </Select>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto">
        {t("admin.listings.title")}
      </h2>
      <p className="text-center text-gray-600 max-w-none">
        {t("admin.listings.itemsRange", {
          from: pagination.from,
          to: pagination.to,
          total: pagination.total_count,
        })}
      </p>

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
        className="my-6"
      />

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {listings.map((listing) => (
          <AdminCard
            key={listing.id}
            title={listing.title}
            subtitle={`${listing.address} • €${listing.price}`}
            image={
              listing.photos && listing.photos.length > 0
                ? listing.photos[0]
                : undefined
            }
            status={
              listing.status === "sold"
                ? { label: listing.status, variant: "error" }
                : listing.status === "rented"
                  ? { label: listing.status, variant: "warning" }
                  : { label: listing.status, variant: "success" }
            }
            actions={
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePreview(listing)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  👁️ Preview
                </button>
                <Link
                  to={appRoutes.backoffice.editListing(listing.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("common.edit")}
                </Link>
              </div>
            }
          >
            {listing.stats && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>🛏️ {listing.stats.bedrooms}</span>
                <span>🚿 {listing.stats.bathrooms}</span>
                <span>🚗 {listing.stats.parking}</span>
                <span>📐 {listing.stats.area}m²</span>
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
        className="mt-6"
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />
    </div>
  );
};

export default AdminListingsPage;
