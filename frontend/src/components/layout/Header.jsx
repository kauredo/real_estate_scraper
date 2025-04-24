import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  // Language switcher
  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);

    // Update URL to reflect language change
    const currentPath = location.pathname;
    if (newLang === "en" && !currentPath.startsWith("/en")) {
      window.location.href = `/en${currentPath}`;
    } else if (newLang === "pt" && currentPath.startsWith("/en")) {
      window.location.href = currentPath.replace(/^\/en/, "");
    }
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="bg-white dark:bg-dark shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            {isDarkMode ? (
              <img
                src="/logos/main_white.webp"
                alt="Sofia Galvão Group"
                className="h-12"
              />
            ) : (
              <img
                src="/logos/main.webp"
                alt="Sofia Galvão Group"
                className="h-12"
              />
            )}
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/comprar"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.buy")}
            </Link>
            <Link
              to="/vender"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.sell")}
            </Link>
            <Link
              to="/empreendimentos"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.enterprises")}
            </Link>
            <Link
              to="/blog"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.blog")}
            </Link>
            <Link
              to="/kw"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.about")}
            </Link>
            <Link
              to="/contactos"
              className="text-dark dark:text-light hover:text-beige-default"
            >
              {t("navbar.contact")}
            </Link>

            <div className="flex space-x-2 ml-4">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 bg-beige-default text-white rounded"
              >
                {i18n.language === "pt" ? "EN" : "PT"}
              </button>
              <button
                onClick={toggleDarkMode}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-dark dark:text-light rounded"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          <button
            className="md:hidden text-dark dark:text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/comprar"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.buy")}
              </Link>
              <Link
                to="/vender"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.sell")}
              </Link>
              <Link
                to="/empreendimentos"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.enterprises")}
              </Link>
              <Link
                to="/blog"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.blog")}
              </Link>
              <Link
                to="/kw"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.about")}
              </Link>
              <Link
                to="/contactos"
                className="text-dark dark:text-light hover:text-beige-default"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.contact")}
              </Link>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={toggleLanguage}
                  className="px-2 py-1 bg-beige-default text-white rounded"
                >
                  {i18n.language === "pt" ? "EN" : "PT"}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-dark dark:text-light rounded"
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
