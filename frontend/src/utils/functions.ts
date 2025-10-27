import { useTranslation } from "react-i18next";
import { i18n as I18nType } from "i18next";
import { translateRoute } from "./routes";

export function truncateText(title: string, length: number): string {
  if (title && title.length > length) {
    return title.substring(0, length) + "...";
  } else {
    return title;
  }
}

export function toCapitalize(str: string): string {
  if (str[0]) {
    return str[0].toUpperCase() + str.substring(1);
  }

  return str;
}

export const changeLocale = (i18n: I18nType) => {
  const newLanguage = i18n.language === "pt" ? "en" : "pt";
  localStorage.setItem("language", newLanguage);
  i18n.changeLanguage(newLanguage);

  const currentPath = window.location.pathname;
  const searchParams = window.location.search;

  // Remove language prefix if it exists
  const pathWithoutLang = currentPath.replace(/^\/(en|pt)\//, "/");
  const segments = pathWithoutLang.split("/").filter(Boolean);

  // Translate the path segments
  const translatedSegments = segments.map((segment) =>
    translateRoute(segment, newLanguage === "en"),
  );

  const newPath = `/${translatedSegments.join("/")}`;
  return newLanguage === "pt" ? newPath : `/en${newPath}${searchParams}`;
};

export const navbarItemClass = (
  path: string | null,
  isMobile: boolean,
  children: string[] = [],
  currentPath?: string,
): string => {
  const base =
    "whitespace-nowrap hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-light px-3 py-2 rounded-md font-medium mx-1 lowercase ";
  const mobile = "block text-base relative z-3 ";
  const desktop = " ";
  const inactive = "text-dark dark:text-light";
  const active =
    "bg-beige-default dark:bg-beige-medium text-white dark:text-dark ";

  const pathname = currentPath || window.location.pathname;
  const isCurrentPath = path ? pathname.includes(path) : false;
  const hasActiveChild = children.some((childPath) =>
    pathname.includes(childPath),
  );
  const isActive = isCurrentPath || hasActiveChild;

  return base + (isActive ? active : inactive) + (isMobile ? mobile : desktop);
};

export const numberToCurrency = (number: number, currency = "EUR"): string => {
  const { i18n } = useTranslation();

  return new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(number);
};

export const gsubMeterSquare = (str: string): string => {
  return str.replace("m2", "m²");
};

export function isDarkModeActive(): boolean {
  const darkMode = localStorage.getItem("darkMode");
  return darkMode === "true";
}

export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) => {
  e.preventDefault();
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
};
