import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Routes from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentAdmin } = useAuth();

  const navItems = [
    {
      routeName: "backoffice_path",
      title: t("navbar.backoffice"),
      icon: "fas fa-home",
    },
    {
      routeName: "backoffice_listings_path",
      title: t("navbar.listings"),
      icon: "fas fa-building",
    },
    {
      routeName: "backoffice_listing_complexes_path",
      title: t("navbar.enterprises"),
      icon: "fas fa-city",
    },
    {
      routeName: "backoffice_testimonials_path",
      title: t("navbar.testimonies"),
      icon: "fas fa-quote-left",
    },
    {
      routeName: "backoffice_blog_posts_path",
      title: t("navbar.blog_posts"),
      icon: "fas fa-newspaper",
    },
    {
      routeName: "backoffice_club_stories_path",
      title: t("navbar.club_stories"),
      icon: "fas fa-star",
    },
    {
      routeName: "backoffice_club_users_path",
      title: t("navbar.club_users"),
      icon: "fas fa-users",
    },
    {
      routeName: "backoffice_newsletter_path",
      title: t("navbar.newsletter"),
      icon: "fas fa-envelope",
    },
    {
      routeName: "backoffice_variables_path",
      title: t("navbar.variables"),
      icon: "fas fa-cog",
    },
  ];

  // Add super admin items if user is super admin
  if (currentAdmin?.isSuperAdmin) {
    navItems.push(
      {
        routeName: "backoffice_super_admin_admins_path",
        title: t("navbar.super_admin_admins"),
        icon: "fas fa-user-shield",
      },
      {
        routeName: "backoffice_super_admin_tenants_path",
        title: t("navbar.super_admin_tenants"),
        icon: "fas fa-database",
      }
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 ease-in-out ${
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
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
