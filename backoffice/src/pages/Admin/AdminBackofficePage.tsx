import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  adminGetListings,
  adminGetBlogPosts,
  adminGetTestimonials,
  adminGetClubUsers,
  adminGetNewsletterSubscriptions,
  adminCreateListing,
  adminFetchListingComplex,
} from "../../services/api";
import { LoadingSpinner, Input, Button } from "../../components/admin/ui";
import { appRoutes } from "../../utils/routes";
import { useTenant } from "../../context/TenantContext";
import {
  extractScraperDomain,
  getScraperDisplayName,
} from "../../utils/functions";

interface Stats {
  listings: number;
  blogPosts: number;
  testimonials: number;
  clubUsers: number;
  newsletterSubs: number;
}

const AdminBackofficePage = () => {
  const { t } = useTranslation();
  const { features, tenant, isSuperAdmin, selectedTenantId, availableTenants } =
    useTenant();
  const [stats, setStats] = useState<Stats>({
    listings: 0,
    blogPosts: 0,
    testimonials: 0,
    clubUsers: 0,
    newsletterSubs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [listingUrl, setListingUrl] = useState("");
  const [complexUrl, setComplexUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Get the effective scraper URL (selected tenant for super admins, or current tenant)
  const effectiveScraperUrl = React.useMemo(() => {
    if (isSuperAdmin && selectedTenantId) {
      const selected = availableTenants.find((t) => t.id === selectedTenantId);
      return selected?.scraper_source_url;
    }
    return tenant?.scraper_source_url;
  }, [isSuperAdmin, selectedTenantId, availableTenants, tenant]);

  const scraperDomain = extractScraperDomain(effectiveScraperUrl);
  const scraperDisplayName = getScraperDisplayName(effectiveScraperUrl);
  const showQuickActions =
    !isSuperAdmin || (isSuperAdmin && selectedTenantId !== null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [listings, blogPosts, testimonials, clubUsers, newsletter] =
          await Promise.all([
            adminGetListings({ per_page: 1 }),
            adminGetBlogPosts({ per_page: 1 }),
            adminGetTestimonials({ per_page: 1 }),
            adminGetClubUsers(),
            adminGetNewsletterSubscriptions(),
          ]);

        setStats({
          listings: listings.data.pagination?.total_count || 0,
          blogPosts: blogPosts.data.pagination?.total_count || 0,
          testimonials: testimonials.data.pagination?.total_count || 0,
          clubUsers: clubUsers.data.club_users?.length || 0,
          newsletterSubs: newsletter.data.newsletter_subscriptions?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scraperDomain) {
      setMessage({
        text: t("admin.dashboard.no_scraper_configured"),
        type: "error",
      });
      return;
    }

    if (!listingUrl.startsWith(scraperDomain)) {
      setMessage({
        text: t("admin.dashboard.invalid_listing_url", {
          domain: scraperDisplayName,
        }),
        type: "error",
      });
      return;
    }

    try {
      setSubmitting(true);
      await adminCreateListing({ url: listingUrl });
      setMessage({
        text: t("admin.dashboard.listing_added"),
        type: "success",
      });
      setListingUrl("");
    } catch {
      setMessage({
        text: t("admin.dashboard.listing_error"),
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplexSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scraperDomain) {
      setMessage({
        text: t("admin.dashboard.no_scraper_configured"),
        type: "error",
      });
      return;
    }

    if (!complexUrl.startsWith(scraperDomain)) {
      setMessage({
        text: t("admin.dashboard.invalid_complex_url", {
          domain: scraperDisplayName,
        }),
        type: "error",
      });
      return;
    }

    try {
      setSubmitting(true);
      await adminFetchListingComplex({ url: complexUrl });
      setMessage({
        text: t("admin.dashboard.complex_added"),
        type: "success",
      });
      setComplexUrl("");
    } catch {
      setMessage({
        text: t("admin.dashboard.complex_error"),
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const allStatCards = [
    {
      title: t("admin.dashboard.total_listings"),
      count: stats.listings,
      icon: "fas fa-building",
      link: appRoutes.backoffice.listings,
      color: "bg-blue-500",
      requiredFeature: null, // Always show
    },
    {
      title: t("admin.dashboard.total_blog_posts"),
      count: stats.blogPosts,
      icon: "fas fa-newspaper",
      link: appRoutes.backoffice.blogPosts,
      color: "bg-green-500",
      requiredFeature: "blog_enabled",
    },
    {
      title: t("admin.dashboard.total_testimonials"),
      count: stats.testimonials,
      icon: "fas fa-quote-left",
      link: appRoutes.backoffice.testimonials,
      color: "bg-yellow-500",
      requiredFeature: "testimonials_enabled",
    },
    {
      title: t("admin.dashboard.total_club_members"),
      count: stats.clubUsers,
      icon: "fas fa-users",
      link: "/club_users",
      color: "bg-purple-500",
      requiredFeature: "club_enabled",
    },
    {
      title: t("admin.dashboard.total_newsletter_subs"),
      count: stats.newsletterSubs,
      icon: "fas fa-envelope",
      link: "/newsletter",
      color: "bg-pink-500",
      requiredFeature: "newsletter_enabled",
    },
  ];

  // Filter stat cards based on tenant features
  const statCards = allStatCards.filter((card) => {
    if (!card.requiredFeature) return true;
    if (!features) return false;
    return features[card.requiredFeature as keyof typeof features] === true;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {t("admin.dashboard.welcome")}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          {t("admin.dashboard.subtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="block bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                  {card.count}
                </p>
              </div>
              <div
                className={`${card.color} bg-opacity-20 p-4 rounded-lg w-14 h-14 flex items-center justify-center`}
              >
                <i className={`${card.icon} text-3xl text-white`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Flash Messages */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "error"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          }`}
        >
          <Button
            onClick={() => setMessage({ text: "", type: "" })}
            variant="link"
            className="float-right text-xl font-bold"
          >
            ×
          </Button>
          {message.text}
        </div>
      )}

      {/* Quick Actions */}
      {showQuickActions ? (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            {t("admin.dashboard.quick_actions")}
          </h2>

          {!scraperDomain ? (
            <div className="text-center py-8">
              <p className="text-neutral-600 dark:text-neutral-400">
                {t("admin.dashboard.no_scraper_configured")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Listing */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {t("admin.dashboard.add_listing")}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {t("admin.dashboard.add_listing_note", {
                    source: scraperDisplayName,
                  })}
                </p>
                <form
                  onSubmit={handleListingSubmit}
                  className="flex gap-3 flex-wrap"
                >
                  <Input
                    type="text"
                    value={listingUrl}
                    onChange={(e) => setListingUrl(e.target.value)}
                    placeholder={`${scraperDomain}/...`}
                    className="flex-1"
                  />
                  <Button type="submit" isLoading={submitting}>
                    {t("common.add")}
                  </Button>
                </form>
              </div>

              {/* Add Complex */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {t("admin.dashboard.add_complex")}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {t("admin.dashboard.add_complex_note", {
                    source: scraperDisplayName,
                  })}
                </p>
                <form
                  onSubmit={handleComplexSubmit}
                  className="flex gap-3 flex-wrap"
                >
                  <Input
                    type="text"
                    value={complexUrl}
                    onChange={(e) => setComplexUrl(e.target.value)}
                    placeholder={`${scraperDomain}/...`}
                    className="flex-1"
                  />
                  <Button type="submit" isLoading={submitting}>
                    {t("common.add")}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            {t("admin.dashboard.quick_actions")}
          </h2>
          <div className="text-center py-8">
            <p className="text-neutral-600 dark:text-neutral-400">
              {t("admin.dashboard.select_tenant_to_add")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBackofficePage;
