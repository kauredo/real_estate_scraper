import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Routes from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";
import { useTenant } from "../../context/TenantContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentAdmin } = useAuth();
  const { features } = useTenant();

  const allNavItems = [
    {
      routeName: "backoffice_path",
      title: t("navbar.backoffice"),
      icon: "fas fa-home",
      requiredFeature: null, // Always show dashboard
    },
    {
      routeName: "backoffice_listings_path",
      title: t("navbar.listings"),
      icon: "fas fa-building",
      requiredFeature: null, // Always show listings
    },
    {
      routeName: "backoffice_listing_complexes_path",
      title: t("navbar.enterprises"),
      icon: "fas fa-city",
      requiredFeature: "listing_complexes_enabled",
    },
    {
      routeName: "backoffice_testimonials_path",
      title: t("navbar.testimonies"),
      icon: "fas fa-quote-left",
      requiredFeature: "testimonials_enabled",
    },
    {
      routeName: "backoffice_blog_posts_path",
      title: t("navbar.blog_posts"),
      icon: "fas fa-newspaper",
      requiredFeature: "blog_enabled",
    },
    {
      routeName: "backoffice_club_stories_path",
      title: t("navbar.club_stories"),
      icon: "fas fa-star",
      requiredFeature: "club_enabled",
    },
    {
      routeName: "backoffice_club_users_path",
      title: t("navbar.club_users"),
      icon: "fas fa-users",
      requiredFeature: "club_enabled",
    },
    {
      routeName: "backoffice_newsletter_path",
      title: t("navbar.newsletter"),
      icon: "fas fa-envelope",
      requiredFeature: "newsletter_enabled",
    },
    {
      routeName: "backoffice_variables_path",
      title: t("navbar.variables"),
      icon: "fas fa-cog",
      requiredFeature: null, // Always show variables
    },
  ];

  // Filter navigation based on tenant features
  const navItems = allNavItems.filter((item) => {
    if (!item.requiredFeature) return true; // Always show items without feature requirement
    if (!features) return false; // Hide if features not loaded yet
    return features[item.requiredFeature as keyof typeof features] === true;
  });

  // Add super admin items if user is super admin
  if (currentAdmin?.isSuperAdmin) {
    navItems.push(
      {
        routeName: "backoffice_super_admin_admins_path",
        title: t("navbar.super_admin_admins"),
        icon: "fas fa-user-shield",
        requiredFeature: null,
      },
      {
        routeName: "backoffice_super_admin_tenants_path",
        title: t("navbar.super_admin_tenants"),
        icon: "fas fa-database",
        requiredFeature: null,
      },
      {
        routeName: "backoffice_super_admin_jobs_path",
        title: t("navbar.super_admin_jobs"),
        icon: "fas fa-tasks",
        requiredFeature: null,
      },
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/60 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 overflow-y-auto`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const itemPath = Routes[item.routeName as keyof typeof Routes];
            const isActive = location.pathname === itemPath;

            return (
              <Link
                key={item.routeName}
                to={itemPath as string}
                onClick={() => {
                  // Close mobile menu on navigation
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                <i className={`${item.icon} w-5 text-center`} />
                <span className="text-sm">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
