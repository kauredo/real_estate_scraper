import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";

export function Footer() {
  const { t } = useTranslation();
  const localizedPath = useLocalizedPath();

  return (
    <footer className="border-t bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo-200.png"
                alt="MyAgentWebsite Logo"
                className="h-6 w-6 object-contain"
              />
              <span className="font-bold">{t("common.siteTitle")}</span>
            </div>
            <p className="text-gray-600 text-sm">{t("common.tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to={localizedPath("/features")}
                  className="hover:text-gray-900"
                >
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link
                  to={localizedPath("/pricing")}
                  className="hover:text-gray-900"
                >
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  to={localizedPath("/contact")}
                  className="hover:text-gray-900"
                >
                  {t("footer.demo")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to={localizedPath("/about")}
                  className="hover:text-gray-900"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to={localizedPath("/contact")}
                  className="hover:text-gray-900"
                >
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
                  href="https://www.notion.so/29853081375781e5a730c36cebc01950"
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

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>{t("footer.copyright")}</p>
            <div className="flex gap-6">
              <Link
                to={localizedPath("/privacy-policy")}
                className="hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                to={localizedPath("/terms-of-service")}
                className="hover:text-gray-900"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
