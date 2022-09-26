import React, { useRef, useState } from "react";
import { Transition } from "@headlessui/react";

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
    { title: "Comprar", turbolinks: "true", url: window.Routes.buy_path() },
    { title: "Vender", turbolinks: "false", url: window.Routes.sell_path() },
    {
      title: "Empreendimentos",
      turbolinks: "true",
      url: window.Routes.latest_path(),
    },
    { title: "Sobre Nós", turbolinks: "true", url: window.Routes.about_path() },
    {
      title: "Contactos",
      turbolinks: "true",
      url: window.Routes.contact_path(),
    },
    {
      title: "Serviços",
      turbolinks: "true",
      url: window.Routes.services_path(),
    },
    {
      title: "Casa 360",
      turbolinks: "true",
      url: window.Routes.house_360_path(),
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
      turbolinks: "true",
      url: window.Routes.kw_path(),
    },
  ];

  const backofficeItems = [
    {
      title: "Imóveis",
      turbolinks: "true",
      url: window.Routes.backoffice_listings_path(),
    },
    {
      title: "Empreendimentos",
      turbolinks: "true",
      url: window.Routes.backoffice_listing_complexes_path(),
    },
    {
      title: "Testemunhos",
      turbolinks: "true",
      url: window.Routes.backoffice_testimonials_path(),
    },
  ];

  const usedItems = backoffice ? backofficeItems : items;

  admin &&
    usedItems.push({
      title: "Backoffice",
      url: window.Routes.backoffice_path(),
    });

  return (
    <div>
      <nav className="bg-white overflow-hidden container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a data-turbolinks="true" href={window.Routes.root_path()}>
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
                        data-turbolinks={item.turbolinks}
                        key={`${item.title}--desktop`}
                        href={item.url}
                        className={itemClass(item.url, false)}
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
              <a href={window.Routes.sell_path()} data-turbolinks={false}>
                <div className="whitespace-nowrap border-beige border-2 text-beige text-base px-4 py-2 rounded hover:bg-beige hover:text-white mr-4">
                  <p>Avalie casa</p>
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
                    data-turbolinks={item.turbolinks}
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
