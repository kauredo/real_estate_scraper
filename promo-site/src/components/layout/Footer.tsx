import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
              <span className="font-bold">{t("common.siteTitle")}</span>
            </div>
            <p className="text-gray-600 text-sm">{t("common.tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/features" className="hover:text-gray-900">
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gray-900">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900">
                  {t("footer.demo")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/about" className="hover:text-gray-900">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://docs.myagentwebsite.com"
                  className="hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.documentation")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@myagentwebsite.com"
                  className="hover:text-gray-900"
                >
                  {t("footer.support")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
