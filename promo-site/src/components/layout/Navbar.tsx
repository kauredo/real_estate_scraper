import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { t } = useTranslation();
  const localizedPath = useLocalizedPath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/features", label: t("nav.features") },
    { path: "/pricing", label: t("nav.pricing") },
    { path: "/case-studies", label: t("nav.caseStudies") },
    { path: "/help", label: t("nav.help") },
    { path: "/about", label: t("nav.about") },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={localizedPath("/")} className="flex items-center space-x-2">
            <img
              src="/logo-200.png"
              alt="MyAgentWebsite Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-xl">{t("common.siteTitle")}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={localizedPath(link.path)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link to={localizedPath("/contact")}>
              <Button variant="default">{t("common.getStarted")}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t("nav.close") : t("nav.menu")}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={localizedPath(link.path)}
                className="block text-gray-600 hover:text-gray-900 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <LanguageSwitcher />
            </div>
            <Link
              to={localizedPath("/contact")}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="default" className="w-full">
                {t("common.getStarted")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
