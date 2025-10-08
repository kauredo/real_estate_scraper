import React, { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { changeLocale } from "../../utils/functions";
import { NavbarItemProps, SubNavItem } from "../../utils/interfaces";
import DarkModeToggle from "../shared/DarkModeToggle";
import SubNavbar from "../shared/SubNavbar";
import NavbarItem from "../shared/NavbarItem";
import DropdownLink from "../shared/DropdownLink";
import Routes from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";

interface Props {
  backoffice?: boolean;
}

export default function Navbar(props: Props) {
  const { t, i18n } = useTranslation();
  const { backoffice } = props;
  const { currentAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const backofficeNavItems: SubNavItem[] = [
    {
      routeName: "backoffice_path",
      title: t("navbar.backoffice"),
    },
    {
      routeName: "backoffice_listings_path",
      title: t("navbar.listings"),
    },
    {
      routeName: "backoffice_listing_complexes_path",
      title: t("navbar.enterprises"),
    },
    {
      routeName: "backoffice_testimonials_path",
      title: t("navbar.testimonies"),
    },
    {
      routeName: "backoffice_blog_posts_path",
      title: t("navbar.blog_posts"),
    },
    {
      routeName: "backoffice_club_stories_path",
      title: t("navbar.club_stories"),
    },
    {
      routeName: "backoffice_club_users_path",
      title: t("navbar.club_users"),
    },
    {
      routeName: "backoffice_newsletter_path",
      title: t("navbar.newsletter"),
    },
    {
      routeName: "backoffice_variables_path",
      title: t("navbar.variables"),
    },
  ];

  // Add super admin menu items if user is super admin
  if (currentAdmin?.isSuperAdmin) {
    backofficeNavItems.push({
      routeName: "backoffice_super_admin_admins_path",
      title: t("navbar.super_admin_admins"),
    });
    backofficeNavItems.push({
      routeName: "backoffice_super_admin_tenants_path",
      title: t("navbar.super_admin_tenants"),
    });
  }

  const otherImg = i18n.language === "pt" ? "uk" : "pt";
  const img = i18n.language === "pt" ? "pt" : "uk";

  const rightItems: NavbarItemProps[] = [];

  rightItems.push({
    title: currentAdmin?.email || "Admin",
    items: [
      {
        title: "",
        children: <DarkModeToggle />,
      },
      {
        title: t("navbar.other_language"),
        onClick: () => {
          const newUrl = changeLocale(i18n);
          window.location.href = newUrl;
        },
        img: (
          <img
            loading="lazy"
            className="h-5 inline-block mb-[2px] pl-1"
            src={`https://hatscripts.github.io/circle-flags/flags/${otherImg}.svg`}
            style={{ maxWidth: "none" }}
          />
        ),
      },
      {
        title: t("navbar.logout"),
        onClick: () => logout(),
      },
    ],
    img: (
      <img
        loading="lazy"
        className="h-5 inline-block mb-[3px] pl-1"
        src={`https://hatscripts.github.io/circle-flags/flags/${img}.svg`}
        style={{ maxWidth: "none" }}
      />
    ),
  });

  const mobileItems: NavbarItemProps[] = [...rightItems];

  return (
    <div>
      <nav className="bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center justify-between min-h-[4rem]">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href={Routes.backoffice_path}>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("navbar.backoffice_title")}
                    </h1>
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="hidden tablet:block">
                  <div className="ml-4 flex items-baseline">
                    {rightItems?.map((item) => {
                      if (item.items?.length && item.items.length > 0) {
                        return (
                          <DropdownLink
                            key={`${item.title}_right`}
                            title={item.title}
                            items={item.items}
                            img={item.img}
                          />
                        );
                      } else {
                        return (
                          <NavbarItem key={`${item.title}_right`} item={item} />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex justify-end tablet:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-white dark:bg-dark inline-flex items-center justify-center p-2 rounded-md text-dark dark:text-light"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="tablet:hidden" id="mobile-menu">
            <div ref={dropdownRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {mobileItems?.map((item) => {
                if (item.items?.length && item.items.length > 0) {
                  return item.items?.map((insideItem) => {
                    return (
                      <NavbarItem
                        key={`${insideItem.title}_mobile`}
                        item={insideItem}
                        fullWidth
                      />
                    );
                  });
                } else {
                  return (
                    <NavbarItem
                      key={`${item.title}_mobile`}
                      item={item}
                      fullWidth
                    />
                  );
                }
              })}
            </div>
          </div>
        </Transition>
      </nav>
      {backoffice && <SubNavbar items={backofficeNavItems} />}
    </div>
  );
}
