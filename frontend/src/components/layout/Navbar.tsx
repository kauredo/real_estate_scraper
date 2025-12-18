import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { changeLocale, isDarkModeActive } from "../../utils/functions";
import { NavbarItemProps } from "../../utils/interfaces";
import Socials from "../shared/Socials";
import DarkModeToggle from "../shared/DarkModeToggle";
import NavbarItem from "../shared/NavbarItem";
import DropdownLink from "../shared/DropdownLink";
import Routes from "../../utils/routes";
import { Button } from "../ui/Button";
import mainWhiteLogo from "../../assets/logos/main_white.webp";
import mainLogo from "../../assets/logos/main.webp";
import CloseIcon from "../svgs/CloseIcon";
import MenuIcon from "../svgs/MenuIcon";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
      url: Routes.buy_path,
    },
    {
      title: `${t("navbar.sell")}`,
      url: Routes.sell_path,
    },
    {
      title: `${t("navbar.enterprises")}`,
      url: Routes.listing_complexes_path,
    },
    {
      title: `${t("navbar.club")}`,
      url: Routes.club_path,
    },
    {
      title: `${t("navbar.blog_posts")}`,
      url: Routes.blog_path,
    },
    {
      title: `${t("navbar.about")}`,
      url: Routes.about_path,
    },
    {
      title: `${t("navbar.services")}`,
      url: Routes.services_path,
    },
    {
      title: `${t("navbar.contacts")}`,
      url: Routes.contact_path,
    },
    {
      title: `${t("navbar.faq")}`,
      url: Routes.faq_path,
    },
  ];

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
        onClick: async () => {
          const newUrl = await changeLocale(i18n);
          navigate(newUrl);
        },
        img: `https://hatscripts.github.io/circle-flags/flags/${otherImg}.svg`,
      },
      {
        title: t("navbar.backoffice"),
        url: Routes.backoffice_path,
      },
    ],
    img: `https://hatscripts.github.io/circle-flags/flags/${img}.svg`,
  });

  mobileItems.push(...rightItems);

  const ctaBtn = Routes.sell_path !== location.pathname && (
    <Link to={Routes.sell_path}>
      <div className="whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark mr-4">
        <p>{t("home.cta.long")}</p>
      </div>
    </Link>
  );

  return (
    <div>
      <nav className="bg-white dark:bg-dark container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center justify-between min-h-[4rem]">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  <Link to={Routes.root_path}>
                    <img
                      loading="lazy"
                      className="w-[6rem] relative z-10"
                      id="nav-logo"
                      src={isDarkModeActive() ? mainWhiteLogo : mainLogo}
                      alt="Sofia Galvão Group Logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden tablet:block">
                  <div className="ml-4 flex items-baseline flex-wrap justify-center gap-1">
                    {middleItems?.map((item) => {
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
                    <Socials small />
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
              <div className="-mr-2 flex justify-end tablet:hidden relative">
                {ctaBtn}
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-white dark:bg-dark inline-flex items-center justify-center p-2 rounded-md text-dark dark:text-light"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">{t("navbar.open_menu")}</span>
                  {!isOpen ? <MenuIcon /> : <CloseIcon />}
                </Button>
              </div>
            </div>
            <div className="tablet:hidden">
              <Socials small />
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
    </div>
  );
}
