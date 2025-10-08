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
import { LoadingSpinner } from "../../components/admin/ui";
import { appRoutes } from "../../utils/routes";

interface Stats {
  listings: number;
  blogPosts: number;
  testimonials: number;
  clubUsers: number;
  newsletterSubs: number;
}

const AdminBackofficePage = () => {
  const { t } = useTranslation();
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
          newsletterSubs:
            newsletter.data.newsletter_subscriptions?.length || 0,
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

    if (!listingUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: t("admin.dashboard.invalid_listing_url"),
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
    } catch (error) {
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

    if (!complexUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: t("admin.dashboard.invalid_complex_url"),
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
    } catch (error) {
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

  const statCards = [
    {
      title: t("admin.dashboard.total_listings"),
      count: stats.listings,
      icon: "🏠",
      link: appRoutes.backoffice.listings,
      color: "bg-blue-500",
    },
    {
      title: t("admin.dashboard.total_blog_posts"),
      count: stats.blogPosts,
      icon: "📝",
      link: appRoutes.backoffice.blogPosts,
      color: "bg-green-500",
    },
    {
      title: t("admin.dashboard.total_testimonials"),
      count: stats.testimonials,
      icon: "⭐",
      link: appRoutes.backoffice.testimonials,
      color: "bg-yellow-500",
    },
    {
      title: t("admin.dashboard.total_club_members"),
      count: stats.clubUsers,
      icon: "👥",
      link: "/backoffice/club_users",
      color: "bg-purple-500",
    },
    {
      title: t("admin.dashboard.total_newsletter_subs"),
      count: stats.newsletterSubs,
      icon: "📧",
      link: "/backoffice/newsletter",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("admin.dashboard.welcome")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t("admin.dashboard.subtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {card.count}
                </p>
              </div>
              <div className={`text-4xl ${card.color} bg-opacity-20 p-3 rounded-lg`}>
                {card.icon}
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
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="float-right text-xl font-bold"
          >
            ×
          </button>
          {message.text}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {t("admin.dashboard.quick_actions")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Listing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {t("admin.dashboard.add_listing")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {t("admin.dashboard.add_listing_note")}
            </p>
            <form onSubmit={handleListingSubmit} className="flex gap-3">
              <input
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="https://www.kwportugal.pt/..."
                className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded py-2 px-3 text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {submitting ? t("common.adding") : t("common.add")}
              </button>
            </form>
          </div>

          {/* Add Complex */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {t("admin.dashboard.add_complex")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {t("admin.dashboard.add_complex_note")}
            </p>
            <form onSubmit={handleComplexSubmit} className="flex gap-3">
              <input
                type="text"
                value={complexUrl}
                onChange={(e) => setComplexUrl(e.target.value)}
                placeholder="https://www.kwportugal.pt/..."
                className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded py-2 px-3 text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {submitting ? t("common.adding") : t("common.add")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBackofficePage;
