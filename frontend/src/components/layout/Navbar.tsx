import React, { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { changeLocale, isDarkModeActive } from "../../utils/functions";
import { NavbarItemProps, SubNavItem } from "../../utils/interfaces";
import Socials from "../shared/Socials";
import DarkModeToggle from "../shared/DarkModeToggle";
import SubNavbar from "../shared/SubNavbar";
import NavbarItem from "../shared/NavbarItem";
import DropdownLink from "../shared/DropdownLink";
import Routes from "../../utils/routes";
import mainWhiteLogo from "../../assets/logos/main_white.webp";
import mainLogo from "../../assets/logos/main.webp";
import { useAuth } from "../../context/AuthContext";

interface Props {
  backoffice?: boolean;
  admin?: boolean;
}

export default function Navbar(props: Props) {
  const { t, i18n } = useTranslation();
  const { backoffice, admin } = props;
  const { currentAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const moreDropdown: NavbarItemProps = {
  //   title: `${t("navbar.more")}`,
  //   items: [
  //     {
  //       title: `${t("navbar.about")}`,
  //       turbo: "true",
  //       url: Routes.about_path,
  //     },
  //     {
  //       title: `${t("navbar.services")}`,
  //       turbo: "true",
  //       url: Routes.services_path,
  //     },
  //     {
  //       title: `${t("navbar.contacts")}`,
  //       turbo: "true",
  //       url: Routes.contact_path,
  //     },
  //   ],
  // };

  const items: NavbarItemProps[] = [
    {
      title: `${t("navbar.buy")}`,
      turbo: "true",
      url: Routes.buy_path,
    },
    {
      title: `${t("navbar.sell")}`,
      turbo: "true",
      url: Routes.sell_path,
    },
    {
      title: `${t("navbar.enterprises")}`,
      turbo: "true",
      url: Routes.listing_complexes_path,
    },
    {
      title: `${t("navbar.club")}`,
      url: Routes.club_path,
      turbo: "true",
    },
    {
      title: `${t("navbar.blog_posts")}`,
      turbo: "true",
      url: Routes.blog_path,
    },
    {
      title: `${t("navbar.about")}`,
      turbo: "true",
      url: Routes.about_path,
    },
    {
      title: `${t("navbar.services")}`,
      turbo: "true",
      url: Routes.services_path,
    },
    {
      title: `${t("navbar.contacts")}`,
      turbo: "true",
      url: Routes.contact_path,
    },
    {
      title: `${t("navbar.faq")}`,
      turbo: "true",
      url: Routes.faq_path,
    },
  ];

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
  ];

  // Add super admin menu item if user is super admin
  if (currentAdmin?.isSuperAdmin) {
    backofficeNavItems.push({
      routeName: "backoffice_super_admin_admins_path",
      title: t("navbar.super_admin"),
    });
  }

  const middleItems = items;

  const otherImg = i18n.language === "pt" ? "uk" : "pt";
  const img = i18n.language === "pt" ? "pt" : "uk";

  const rightItems: NavbarItemProps[] = [];

  const mobileItems: NavbarItemProps[] = middleItems.slice();

  rightItems.push({
    title: "",
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

  mobileItems.push(...rightItems);

  if (admin && rightItems[0] && rightItems[0].items) {
    if (!backoffice) {
      rightItems[0].items.unshift({
        title: "Backoffice",
        url: Routes.backoffice_path,
        turbo: "true",
      });
    }

    rightItems[0].items.push({
      title: "Log out",
      url: Routes.destroy_admin_session_path,
      method: "delete",
      turbo: "false",
    });
  }

  const ctaBtn = Routes.sell_path !== window.location.pathname && (
    <a href={Routes.sell_path} data-turbo={false}>
      <div className="whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark mr-4">
        <p>{t("home.cta.long")}</p>
      </div>
    </a>
  );

  return (
    <div>
      <nav className="bg-white dark:bg-dark container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center justify-between min-h-[4rem]">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  <a data-turbo="true" href={Routes.root_path}>
                    <img
                      loading="lazy"
                      className="w-[6rem] relative z-10"
                      id="nav-logo"
                      src={isDarkModeActive() ? mainWhiteLogo : mainLogo}
                      alt="Sofia Galvão Group Logo"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden tablet:block">
                  <div className="ml-4 flex items-baseline flex-wrap justify-center gap-1">
                    {middleItems?.map(item => {
                      if (item.items?.length && item.items.length > 0) {
                        return (
                          <DropdownLink
                            key={`${item.title}_middle`}
                            title={item.title}
                            items={item.items}
                            img={item.img}
                          />
                        );
                      } else {
                        return (
                          <NavbarItem
                            key={`${item.title}_middle`}
                            item={item}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden tablet:block">
                  <div className="ml-4 flex items-baseline">
                    {!backoffice && <Socials small />}
                    {rightItems?.map(item => {
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
              <div className="-mr-2 flex justify-end tablet:hidden relative">
                {ctaBtn}
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
            {!backoffice && (
              <div className="tablet:hidden">
                <Socials small />
              </div>
            )}
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
              {mobileItems?.map(item => {
                if (item.items?.length && item.items.length > 0) {
                  return item.items?.map(insideItem => {
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
