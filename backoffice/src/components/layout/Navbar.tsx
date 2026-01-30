/* eslint-disable no-restricted-syntax, i18next/no-literal-string */
import { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { changeLocale } from "../../utils/functions";
import { NavbarItemProps } from "../../utils/interfaces";
import DarkModeToggle from "../shared/DarkModeToggle";
import NavbarItem from "../shared/NavbarItem";
import DropdownLink from "../shared/DropdownLink";
import Routes from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";
import TenantSelector from "./TenantSelector";
import { Button } from "../admin/ui";

interface Props {
  onToggleSidebar?: () => void;
}

export default function Navbar(props: Props) {
  const { t, i18n } = useTranslation();
  const { onToggleSidebar } = props;
  const { currentAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          changeLocale(i18n);
        },
        img: (
          <img
            loading="lazy"
            className="h-5 inline-block pl-3"
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
        className="h-5 inline-block pl-1"
        src={`https://hatscripts.github.io/circle-flags/flags/${img}.svg`}
        style={{ maxWidth: "none" }}
      />
    ),
  });

  const mobileItems: NavbarItemProps[] = [...rightItems];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4rem]">
          <div className="flex items-center gap-4">
            {/* Hamburger menu button */}
            {onToggleSidebar && (
              <Button
                onClick={onToggleSidebar}
                variant="link"
                className="lg:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            )}

            <div className="flex-shrink-0">
              <a
                href={Routes.backoffice_path}
                className="flex items-center gap-3"
              >
                <img
                  src="/logo-40.png"
                  alt="MyAgentWebsite"
                  className="h-8 w-8 object-contain"
                />
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {t("navbar.backoffice_title")}
                </h1>
              </a>
            </div>

            {/* Tenant Selector for Super Admins */}
            <TenantSelector />
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

          <div className="flex justify-end tablet:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="link"
              className="bg-white dark:bg-dark inline-flex items-center justify-center p-2 rounded-md text-dark dark:text-light"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open user menu</span>
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
            </Button>
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
  );
}
