import { i18n } from "../../languages/languages";

export function truncateText(title, length) {
  if (title.length > 90) {
    return title.substring(0, length) + "...";
  } else {
    return title;
  }
}

export function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

export function toCapitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}

export const sanitizeURL = url => {
  if (i18n.locale === "pt") {
    return url();
  } else {
    return url({ locale: i18n.locale });
  }
};

export const sanitizeURLWithParams = (url, params) => {
  if (i18n.locale === "pt") {
    return url(params);
  } else {
    return url(params, { locale: i18n.locale });
  }
};

export const changeLocale = () => {
  var url = [window.location.origin];
  if (window.location.pathname.split("/")[1] === "en") {
    const path = window.location.pathname.split("/");
    path.splice(1, 1);
    url.push(path.join("/"));
  } else if (window.location.pathname.split("/")[1] === "pt") {
    const path = window.location.pathname.split("/");
    path.splice(1, 1);
    url.push("/en");
    url.push(path.join("/"));
  } else {
    url.push("/en");
    url.push(window.location.pathname);
  }

  url.push(window.location.search);

  return url.join("");
};

export function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export const navbarItemClass = (path, isMobile, children: string[] = []) => {
  const base =
    "whitespace-nowrap hover:bg-beige hover:text-white px-3 py-2 rounded-md font-medium mx-1 lowercase block w-max ";
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
  if (
    children.length > 0 &&
    children.filter(path => path === window.location.pathname).length > 0
  ) {
    return base + active + desktop;
  }
  if (isMobile) {
    return base + inactive + mobile;
  }
  return base + inactive + desktop;
};
