import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">{t("common.siteTitle")}</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {t("nav.features")}
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {t("nav.about")}
            </Link>
            <LanguageSwitcher />
            <Link to="/contact">
              <Button variant="default">{t("common.getStarted")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
