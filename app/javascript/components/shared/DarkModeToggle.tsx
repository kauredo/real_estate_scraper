import React, { useState } from "react";
import { isDarkModeActive, sanitizeURL } from "../utils/Functions";
import Toggle from "../base/Toggle";
import { i18n } from "../../languages/languages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeActive());

  const toggleDarkMode = () => {
    const url = sanitizeURL(window.Routes.toggle_dark_mode_path);
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
        if (response.ok) {
          document.getElementById("sgg")?.classList.toggle("dark");
          setIsDarkMode(!isDarkMode);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <Toggle
      labels={[i18n.t("navbar.dark_mode"), i18n.t("navbar.light_mode")]}
      icons={[
        <FontAwesomeIcon icon={faMoon as IconProp} />,
        <FontAwesomeIcon icon={faSun as IconProp} />,
      ]}
      toggled={!isDarkMode}
      onClick={toggleDarkMode}
    />
  );
}
