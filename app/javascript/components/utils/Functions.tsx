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
  } else {
    url.push("/en");
    url.push(window.location.pathname);
  }

  url.push(window.location.search);

  return url.join("");
};
