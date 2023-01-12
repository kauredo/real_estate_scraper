import React, { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { i18n } from "../languages/languages";
import { changeLocale, sanitizeURL } from "./utils/Functions";

interface Props {
  backoffice?: boolean;
  admin?: boolean;
}

export default function Navbar(props: Props) {
  const { backoffice, admin } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const itemClass = (path, isMobile) => {
    const base =
      "whitespace-nowrap hover:bg-beige hover:text-white px-3 py-2 rounded-md font-medium mx-1 lowercase ";
    const mobile = "block text-base relative z-3 ";
    const desktop = "text-sm ";
    const inactive = "text-gray-800 ";
    const active = "bg-beige text-white ";

    if (path === window.location.pathname && isMobile) {
      return base + active + mobile;
    }
    if (path === window.location.pathname) {
      return base + active + desktop;
    }
    if (isMobile) {
      return base + inactive + mobile;
    }
    return base + inactive + desktop;
  };

  const items = [
    {
      title: `${i18n.t("navbar.buy")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.buy_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.sell")}`,
      turbo: "false",
      url: sanitizeURL(window.Routes.sell_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.enterprises")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.latest_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.about")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.about_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.contacts")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.contact_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.services")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.services_path),
      img: null,
    },
    {
      title: `${i18n.t("navbar.house_360")}`,
      turbo: "true",
      url: sanitizeURL(window.Routes.house_360_path),
      img: null,
    },
    {
      title: "Powered by ",
      img: (
        <img
          className="h-5 inline-block mb-[6px]"
          src="/images/kw_logo.png"
          alt="KW Logo"
        />
      ),
      turbo: "true",
      url: sanitizeURL(window.Routes.kw_path),
    },
  ];

  const backofficeItems = [
    {
      title: "Imóveis",
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_listings_path),
      img: null,
    },
    {
      title: "Empreendimentos",
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_listing_complexes_path),
      img: null,
    },
    {
      title: "Testemunhos",
      turbo: "true",
      url: sanitizeURL(window.Routes.backoffice_testimonials_path),
      img: null,
    },
  ];

  const usedItems = backoffice ? backofficeItems : items;

  admin &&
    usedItems.push({
      title: "Backoffice",
      url: sanitizeURL(window.Routes.backoffice_path),
      turbo: "true",
      img: null,
    });

  const img = i18n.locale === "pt" ? "uk" : "pt";

  usedItems.push({
    title: "",
    url: changeLocale(),
    turbo: "false",
    img: (
      <img
        className="h-5 inline-block mb-[6px]"
        src={`https://hatscripts.github.io/circle-flags/flags/${img}.svg`}
        style={{ maxWidth: "none" }}
      />
    ),
  });

  return (
    <div>
      <nav className="bg-white overflow-hidden container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  data-turbo="true"
                  href={sanitizeURL(window.Routes.root_path)}
                >
                  <img
                    // src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    // className="h-16 w-16"
                    className="w-[8rem] relative z-1"
                    src="/logos/main_color.png"
                    alt="Sofia Galvão Group Logo"
                  />
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden tablet:block">
                <div className="ml-10 flex items-baseline">
                  {usedItems.map(item => {
                    return (
                      <a
                        data-turbo={item.turbo}
                        key={`${item.title}--desktop`}
                        href={item.url}
                        className={
                          item.title.length > 0
                            ? itemClass(item.url, false)
                            : ""
                        }
                      >
                        {item.title}
                        {item.img}
                      </a>
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
              {usedItems.map(item => {
                return (
                  <a
                    data-turbo={item.turbo}
                    key={`${item.title}--desktop`}
                    href={item.url}
                    className={itemClass(item.url, true)}
                  >
                    {item.title}
                    {item.img}
                  </a>
                );
              })}
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}
