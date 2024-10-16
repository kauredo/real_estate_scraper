import { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { i18n } from "../../languages/languages";
import { changeLocale, sanitizeURL } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";
import NavbarItem from "../shared/NavbarItem";
import DropdownLink from "../shared/DropdownLink";
import { HashLink } from "react-router-hash-link";
import kw_logo from "../../assets/images/kw_logo.webp";
import main_color from "../../assets/logos/main_color.webp";

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

  const moreDropdown: NavbarItemProps = {
    title: `${i18n.t("navbar.more")}`,
    url: "#",
    items: [
      {
        title: `${i18n.t("navbar.about")}`,
        turbo: "true",
        url: sanitizeURL("/about"),
      },
      {
        title: `${i18n.t("navbar.services")}`,
        turbo: "true",
        url: sanitizeURL("/services"),
      },
      {
        title: `${i18n.t("navbar.house_360")}`,
        turbo: "true",
        url: sanitizeURL("/house_360"),
      },
      {
        title: `${i18n.t("navbar.contacts")}`,
        turbo: "true",
        url: sanitizeURL("/contact"),
      },
    ],
  };

  const items: NavbarItemProps[] = [
    {
      title: `${i18n.t("navbar.buy")}`,
      turbo: "true",
      url: sanitizeURL("/buy"),
    },
    {
      title: `${i18n.t("navbar.sell")}`,
      turbo: "true",
      url: sanitizeURL("/sell"),
    },
    {
      title: `${i18n.t("navbar.enterprises")}`,
      turbo: "true",
      url: sanitizeURL("/latest"),
    },
    {
      title: `${i18n.t("navbar.blog_posts")}`,
      turbo: "true",
      url: sanitizeURL("/blog"),
    },
    {
      title: "Partnership with ",
      img: (
        <img
          loading="lazy"
          className="h-5 inline-block mb-[6px]"
          src={kw_logo}
          alt="KW Logo"
        />
      ),
      turbo: "true",
      url: sanitizeURL("/kw"),
    },
    moreDropdown,
  ];

  const backofficeItems: NavbarItemProps[] = [
    {
      title: `${i18n.t("navbar.listings")}`,
      turbo: "true",
      url: sanitizeURL("/backoffice_listings"),
    },
    {
      title: `${i18n.t("navbar.enterprises")}`,
      turbo: "true",
      url: sanitizeURL("/backoffice_listing_complexes"),
    },
    {
      title: `${i18n.t("navbar.testimonies")}`,
      turbo: "true",
      url: sanitizeURL("/backoffice_testimonials"),
    },
    {
      title: `${i18n.t("navbar.blog_posts")}`,
      turbo: "true",
      url: sanitizeURL("/backoffice_blog_posts"),
    },
  ];

  const middleItems = backoffice ? backofficeItems : items;

  const img = i18n.locale === "pt" ? "uk" : "pt";

  const rightItems: NavbarItemProps[] = [];

  const mobileItems: NavbarItemProps[] = middleItems.slice();

  rightItems.push({
    title: "",
    url: "#",
    turbo: "false",
    hover: `${i18n.t("navbar.language")}`,
    onClick: () => changeLocale(),
    img: (
      <img
        loading="lazy"
        className="h-5 inline-block mb-[6px]"
        src={`https://hatscripts.github.io/circle-flags/flags/${img}.svg`}
        style={{ maxWidth: "none" }}
        alt="Language"
      />
    ),
  });

  mobileItems.push(...rightItems);

  admin &&
    rightItems.unshift({
      title: "Backoffice",
      url: sanitizeURL("/backoffice"),
      turbo: "true",
    });

  admin &&
    mobileItems.unshift({
      title: "Backoffice",
      url: sanitizeURL("/backoffice"),
      turbo: "true",
    });

  const showBtnOnNavbar = sanitizeURL("/sell") !== window.location.pathname && (
    <HashLink to={sanitizeURL("/sell")} data-turbo={false}>
      <div className="whitespace-nowrap border-beige border-2 text-beige text-base px-4 py-2 rounded hover:bg-beige hover:text-white mr-4">
        <p>{i18n.t("home.cta.long")}</p>
      </div>
    </HashLink>
  );

  const backofficeBtn = admin &&
    !window.location.pathname.includes("backoffice") && (
      <HashLink to={sanitizeURL("/backoffice")} data-turbo={false}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <p>{i18n.t("navbar.backoffice")}</p>
        </div>
      </HashLink>
    );

  const resourceBtn = admin && resource && (
    <HashLink to={resource.path} data-turbo={false}>
      <div className="ml-2 whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <p>Editar {resource.name} no Backoffice</p>
      </div>
    </HashLink>
  );

  const adminBtns = admin && (
    <div className="z-10 absolute top-24 left-0 flex">
      {backofficeBtn}
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
                <HashLink to="/">
                  <img
                    loading="lazy"
                    className="w-[8rem] relative z-10"
                    src={main_color}
                    alt="Sofia Galvão Group Logo"
                  />
                </HashLink>
                {adminBtns}
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden tablet:block">
                <div className="ml-10 flex items-baseline flex-wrap justify-center">
                  {middleItems?.map(item => {
                    if (item.items?.length && item.items.length > 0) {
                      return (
                        <DropdownLink
                          title={item.title}
                          items={item.items}
                          key={item.title}
                        />
                      );
                    } else {
                      return <NavbarItem item={item} key={item.title} />;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden tablet:block">
                <div className="ml-10 flex items-baseline">
                  {showBtnOnNavbar}
                  {rightItems.map(item => {
                    return <NavbarItem item={item} key={item.title} />;
                  })}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex tablet:hidden">
              <HashLink to={sanitizeURL("/sell")} data-turbo={false}>
                <div className="whitespace-nowrap border-beige border-2 text-beige text-base px-4 py-2 rounded hover:bg-beige hover:text-white mr-4">
                  <p>{i18n.t("home.cta.short")}</p>
                </div>
              </HashLink>
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
                  return item.items.map(insideItem => {
                    return (
                      <NavbarItem
                        item={insideItem}
                        fullWidth
                        key={insideItem.title}
                      />
                    );
                  });
                } else {
                  return <NavbarItem item={item} fullWidth key={item.title} />;
                }
              })}
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}
