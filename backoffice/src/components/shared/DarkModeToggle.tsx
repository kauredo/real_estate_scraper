import { useState, useEffect } from "react";
import { isDarkModeActive } from "../../utils/functions";
import Toggle from "../base/Toggle";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function DarkModeToggle() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeActive());

  useEffect(() => {
    // Apply dark mode on initial load
    if (isDarkMode) {
      document.getElementById("root")?.classList.add("dark");
    } else {
      document.getElementById("root")?.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    localStorage.setItem("darkMode", String(newDarkMode));

    // Update UI
    document.getElementById("root")?.classList.toggle("dark");
    const navImg = document.getElementById("nav-logo")?.getAttribute("src");
    if (navImg) {
      const imgs = document.querySelectorAll(`img[src="${navImg}"]`);
      const newImg = navImg.includes("white")
        ? navImg.replace("main_white", "main")
        : navImg.replace("main", "main_white");
      imgs.forEach((img) => img.setAttribute("src", newImg));
    }

    setIsDarkMode(newDarkMode);

    // Sync with backend
    fetch(`${import.meta.env.VITE_API_URL}/toggle_dark_mode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error syncing dark mode:", error));
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
