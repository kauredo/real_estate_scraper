import React, { useState } from "react";
import { isDarkModeActive, sanitizeURL } from "../../utils/functions";
import Toggle from "../base/Toggle";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Routes from "../../utils/routes";

export default function DarkModeToggle() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeActive());

  const toggleDarkMode = () => {
    const url = sanitizeURL(Routes.toggle_dark_mode_path);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") ?? "",
      },
    })
      .then(response => {
        if (response.redirected) {
          document.getElementById("sgg")?.classList.toggle("dark");
          const navImg = document
            .getElementById("nav-logo")
            ?.getAttribute("src");
          if (navImg) {
            const imgs = document.querySelectorAll(`img[src="${navImg}"]`);
            const newImg = navImg.includes("white")
              ? navImg.replace("main_white", "main")
              : navImg.replace("main", "main_white");
            // search elements by src attribute as navImg
            // is a relative path and may change
            imgs.forEach(img => img.setAttribute("src", newImg));
          }

          setIsDarkMode(!isDarkMode);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <Toggle
      labels={[t("navbar.dark_mode"), t("navbar.light_mode")]}
      icons={[
        <FontAwesomeIcon icon={faMoon as IconProp} />,
        <FontAwesomeIcon icon={faSun as IconProp} />,
      ]}
      toggled={!isDarkMode}
      onClick={toggleDarkMode}
    />
  );
}
