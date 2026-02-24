import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://sofiagalvaogroup.com";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

export const useMetaTags = ({
  title,
  description,
  image,
  type = "website",
  url,
}: MetaTagsProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = lang === "pt" ? "pt" : "en";

    if (title) {
      document.title = title;
      updateMetaTag("og:title", title);
      updateMetaTag("twitter:title", title);
    }

    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description);
      updateMetaTag("twitter:description", description);
    }

    if (image) {
      updateMetaTag("og:image", image);
      updateMetaTag("twitter:image", image);
    }

    if (url) {
      updateMetaTag("og:url", url);
      updateMetaTag("twitter:url", url);
    }

    updateMetaTag("og:type", type);
    updateMetaTag("twitter:card", "summary_large_image");

    // Update og:locale and og:locale:alternate
    const currentLocale = lang === "pt" ? "pt_PT" : "en_US";
    const alternateLocale = lang === "pt" ? "en_US" : "pt_PT";
    updateMetaTag("og:locale", currentLocale);
    updateMetaTag("og:locale:alternate", alternateLocale);

    // Generate canonical and hreflang URLs
    const pathname = location.pathname;
    // Strip language prefix to get the base path
    const basePath = pathname.replace(/^\/en(\/|$)/, "/");
    const ptUrl = `${SITE_URL}${basePath}`;
    const enUrl = `${SITE_URL}/en${basePath === "/" ? "" : basePath}`;
    const canonicalUrl = lang === "pt" ? ptUrl : enUrl;

    updateLinkTag("canonical", canonicalUrl);
    updateLinkTag("alternate", ptUrl, "pt");
    updateLinkTag("alternate", enUrl, "en");
    updateLinkTag("alternate", ptUrl, "x-default"); // Default to Portuguese
  }, [title, description, image, type, url, lang, location.pathname]);
};

const updateMetaTag = (name: string, content: string) => {
  let element =
    document.querySelector(`meta[name="${name}"]`) ||
    document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    if (name.startsWith("og:")) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.querySelector(selector) as HTMLLinkElement;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }

  element.href = href;
};
