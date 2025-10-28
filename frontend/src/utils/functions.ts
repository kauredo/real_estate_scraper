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

// Helper to detect resource type and slug from path
const extractResourceFromPath = (
  pathname: string,
): { resourceType: string; slug: string } | null => {
  // Remove language prefix
  const pathWithoutLang = pathname.replace(/^\/(en|pt)\//, "/");

  // Match patterns for detail pages
  // /comprar/:slug or /buy/:slug -> listing
  if (pathWithoutLang.match(/^\/(comprar|buy)\/([^/]+)$/)) {
    const slug = pathWithoutLang.split("/")[2];
    return { resourceType: "listing", slug };
  }

  // /blog/:slug -> blog_post
  if (pathWithoutLang.match(/^\/blog\/([^/]+)$/)) {
    const slug = pathWithoutLang.split("/")[2];
    return { resourceType: "blog_post", slug };
  }

  // /empreendimentos/:slug or /enterprises/:slug -> listing_complex
  if (pathWithoutLang.match(/^\/(empreendimentos|enterprises)\/([^/]+)$/)) {
    const slug = pathWithoutLang.split("/")[2];
    return { resourceType: "listing_complex", slug };
  }

  // /clube-sgg/historias/:slug or /club/stories/:slug -> club_story
  if (
    pathWithoutLang.match(/^\/(clube-sgg\/historias|club\/stories)\/([^/]+)$/)
  ) {
    const slug = pathWithoutLang.split("/").pop() || "";
    return { resourceType: "club_story", slug };
  }

  return null;
};

// Helper to fetch translated slug from API
const getTranslatedSlug = async (
  resourceType: string,
  currentSlug: string,
  targetLocale: string,
): Promise<string> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const response = await fetch(
      `${apiUrl}/api/v1/translations/slug?resource_type=${resourceType}&slug=${currentSlug}&locale=${targetLocale}`,
    );

    if (!response.ok) {
      console.warn(
        `Could not fetch translated slug for ${resourceType}/${currentSlug}`,
      );
      return currentSlug; // Fallback to original slug
    }

    const data = await response.json();
    return data.slug || currentSlug;
  } catch (error) {
    console.error("Error fetching translated slug:", error);
    return currentSlug; // Fallback to original slug on error
  }
};

export const changeLocale = async (i18n: I18nType) => {
  const newLanguage = i18n.language === "pt" ? "en" : "pt";
  localStorage.setItem("language", newLanguage);
  i18n.changeLanguage(newLanguage);

  const currentPath = window.location.pathname;
  const searchParams = window.location.search;

  // Check if we're on a detail page with a translatable slug
  const resourceInfo = extractResourceFromPath(currentPath);

  if (resourceInfo) {
    // Fetch the translated slug
    const translatedSlug = await getTranslatedSlug(
      resourceInfo.resourceType,
      resourceInfo.slug,
      newLanguage,
    );

    // Build the new path with translated slug
    const pathWithoutLang = currentPath.replace(/^\/(en|pt)\//, "/");
    const segments = pathWithoutLang.split("/").filter(Boolean);

    // Replace the slug (last segment) with translated slug
    segments[segments.length - 1] = translatedSlug;

    // Translate the route segments (all except the slug)
    const translatedSegments = segments
      .slice(0, -1)
      .map((segment) => translateRoute(segment, newLanguage === "en"));
    translatedSegments.push(translatedSlug);

    const newPath = `/${translatedSegments.join("/")}`;
    return newLanguage === "pt" ? newPath : `/en${newPath}${searchParams}`;
  }

  // Original logic for non-detail pages
  const pathWithoutLang = currentPath.replace(/^\/(en|pt)\//, "/");
  const segments = pathWithoutLang.split("/").filter(Boolean);

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
