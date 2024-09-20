import React, { lazy, Suspense, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { i18n } from "../languages/languages";
import { changeLocale, sanitizeURL } from "./utils/Functions";
import { NavbarItemProps } from "./utils/Interfaces";
const NavbarItem = lazy(() => import("./shared/NavbarItem"));
const DropdownLink = lazy(() => import("./shared/DropdownLink"));

interface Resource {
  path: string;
  name: string;
}

interface Props {
  backoffice?: boolean;
  admin?: boolean;
  resource?: Resource;
}

export default function Navbar(props: Props) {
  const { backoffice, admin, resource } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const moreDropdown: NavbarItemProps = {
  //   title: `${i18n.t("navbar.more")}`,
  //   items: [
  //     {
  //       title: `${i18n.t("navbar.about")}`,
  //       turbo: "true",
  //       url: sanitizeURL(window.Routes.about_path),
  //     },
  //     {
  //       title: `${i18n.t("navbar.services")}`,
  //       turbo: "true",
  //       url: sanitizeURL(window.Routes.services_path),
  //     },
  //     {
  //       title: `${i18n.t("navbar.contacts")}`,
  //       turbo: "true",
  //       url: sanitizeURL(window.Routes.contact_path),
  //     },
  //   ],
  // };

  const items: NavbarItemProps[] = [
    {
      title: `${i18n.t("navbar.buy")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.buy_path),
    },
    {
      title: `${i18n.t("navbar.sell")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.sell_path),
    },
    {
      title: `${i18n.t("navbar.enterprises")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.latest_path),
    },
    {
      title: `${i18n.t("navbar.blog_posts")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.blog_path),
    },
    {
      title: "Partnership with ",
      img: (
        <img
          loading="lazy"
          className="h-5 inline-block mb-[6px]"
          src="/images/kw_logo.webp"
          alt="KW Logo"
        />
      ),
      turbo: "true",
      url: sanitizeURL(window.Routes.kw_path),
    },
    // moreDropdown,
    {
      title: `${i18n.t("navbar.about")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.about_path),
    },
    {
      title: `${i18n.t("navbar.services")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.services_path),
    },
    {
      title: `${i18n.t("navbar.contacts")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.contact_path),
    },
    {
      title: `${i18n.t("navbar.faq")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.faq_path),
    },
  ];

  const backofficeItems: NavbarItemProps[] = [
    {
      title: `${i18n.t("navbar.listings")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_listings_path),
    },
    {
      title: `${i18n.t("navbar.enterprises")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_listing_complexes_path),
    },
    {
      title: `${i18n.t("navbar.testimonies")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_testimonials_path),
    },
    {
      title: `${i18n.t("navbar.blog_posts")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_blog_posts_path),
    },
  ];

  const middleItems = backoffice ? backofficeItems : items;

  const img = i18n.locale === "pt" ? "uk" : "pt";

  const rightItems: NavbarItemProps[] = [];

  const mobileItems: NavbarItemProps[] = middleItems.slice();

  rightItems.push({
    title: "",
    url: changeLocale(),
    turbo: "false",
    hover: `${i18n.t("navbar.language")}`,
    img: (
      <img
        loading="lazy"
        className="h-5 inline-block mb-[6px]"
        src={`https://hatscripts.github.io/circle-flags/flags/${img}.svg`}
        style={{ maxWidth: "none" }}
      />
    ),
  });

  mobileItems.push(...rightItems);

  admin &&
    rightItems.unshift({
      title: "Backoffice",
      url: sanitizeURL(window.Routes.backoffice_path),
      turbo: "true",
    });

  admin &&
    mobileItems.unshift({
      title: "Backoffice",
      url: sanitizeURL(window.Routes.backoffice_path),
      turbo: "true",
    });

  const showBtnOnNavbar = sanitizeURL(window.Routes.sell_path) !==
    window.location.pathname && (
    <a href={sanitizeURL(window.Routes.sell_path)} data-turbo={false}>
      <div className="whitespace-nowrap border-beige border-2 text-beige text-base px-4 py-2 rounded hover:bg-beige hover:text-white mr-4">
        <p>{i18n.t("home.cta.long")}</p>
      </div>
    </a>
  );

  // const backofficeBtn = admin &&
  //   !window.location.pathname.includes("backoffice") && (
  //     <a href={sanitizeURL(window.Routes.backoffice_path)} data-turbo={false}>
  //       <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  //         <p>{i18n.t("navbar.backoffice")}</p>
  //       </div>
  //     </a>
  //   );

  const resourceBtn = admin && resource && (
    <a href={resource.path} data-turbo={false}>
      <div className="ml-2 whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <p>Editar {resource.name} no Backoffice</p>
      </div>
    </a>
  );

  const adminBtns = admin && (
    <div className="z-10 absolute top-24 left-0 flex">
      {/* {backofficeBtn} */}
      {resourceBtn}
    </div>
  );

  return (
    <div>
      <nav className="bg-white container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[4rem]">
            <div className="flex items-center">
              <div className="flex-shrink-0 relative">
                <a
                  data-turbo="true"
                  href={sanitizeURL(window.Routes.root_path)}
                >
                  <img
                    loading="lazy"
                    className="w-[8rem] relative z-10"
                    src="/logos/main_color.webp"
                    alt="Sofia Galvão Group Logo"
                  />
                </a>
                {adminBtns}
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden tablet:block">
                <div className="ml-10 flex items-baseline flex-wrap justify-center">
                  {middleItems?.map(item => {
                    if (item.items?.length && item.items.length > 0) {
                      return (
                        <Suspense
                          key={`${item.title}_middle`}
                          fallback={<div>Loading...</div>}
                        >
                          <DropdownLink title={item.title} items={item.items} />
                        </Suspense>
                      );
                    } else {
                      return (
                        <Suspense
                          fallback={<div>Loading...</div>}
                          key={`${item.title}_middle`}
                        >
                          <NavbarItem item={item} />
                        </Suspense>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden tablet:block">
                <div className="ml-10 flex items-baseline">
                  {/* {showBtnOnNavbar} */}
                  {rightItems?.map(item => {
                    return (
                      <Suspense
                        fallback={<div>Loading...</div>}
                        key={`${item.title}_right`}
                      >
                        <NavbarItem item={item} />
                      </Suspense>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex tablet:hidden">
              <a href={sanitizeURL(window.Routes.sell_path)} data-turbo={false}>
                <div className="whitespace-nowrap border-beige border-2 text-beige text-base px-4 py-2 rounded hover:bg-beige hover:text-white mr-4">
                  <p>{i18n.t("home.cta.short")}</p>
                </div>
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white-900 inline-flex items-center justify-center p-2 rounded-md text-gray-800"
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
                      <Suspense
                        fallback={<div>Loading...</div>}
                        key={`${insideItem.title}_mobile`}
                      >
                        <NavbarItem item={insideItem} fullWidth />
                      </Suspense>
                    );
                  });
                } else {
                  return (
                    <Suspense
                      fallback={<div>Loading...</div>}
                      key={`${item.title}_mobile`}
                    >
                      <NavbarItem item={item} fullWidth />
                    </Suspense>
                  );
                }
              })}
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}
