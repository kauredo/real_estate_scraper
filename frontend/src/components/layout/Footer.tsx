import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import Routes from "@/utils/routes";
import mainWhiteLogo from "@/assets/logos/main_white.webp";

export default function Footer() {
  const { t } = useTranslation();
  const socialItems = [
    {
      title: "Instagram",
      url: "https://www.instagram.com/sofiagalvaogroupkw/",
      icon: faInstagram,
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/sofiagalvaokw",
      icon: faFacebook,
    },
    { title: "Whatsapp", url: "https://wa.me/351932829084", icon: faWhatsapp },
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/in/sofia-galv%C3%A3o-a141621/",
      icon: faLinkedin,
    },
  ];

  const navItems = [
    { label: t("footer.about"), path: Routes.about_path },
    { label: t("footer.privacy"), path: Routes.privacy_path },
    { label: t("footer.terms"), path: Routes.terms_and_conditions_path },
    { label: t("footer.contacts"), path: Routes.contact_path },
  ];

  return (
    <footer
      className="bg-beige-default dark:bg-beige-medium p-4 sm:p-12 mt-12"
      role="contentinfo"
    >
      <div className="container mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://sofiagalvaogroup.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              loading="lazy"
              src={mainWhiteLogo}
              className="h-12"
              alt="Sofia Galvão Group"
            />
          </a>
          <nav aria-label={t("footer.navigation") || "Footer navigation"}>
            <ul className="flex flex-wrap items-center text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="px-3 py-2 text-white dark:text-light hover:text-white/80 dark:hover:text-light/80 underline-offset-4 hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <hr className="my-6 border-white/30 dark:border-light/30 sm:mx-auto lg:my-8" />
        <div className="sm:flex justify-between tablet:justify-start items-center">
          <div className="tablet:pr-4">
            <p className="text-sm text-white dark:text-light">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-sm text-white dark:text-light">
              {t("footer.address")}
            </p>
            <p className="text-sm text-white dark:text-light">
              {t("footer.license")}
            </p>
            <p className="text-xs text-white/60 dark:text-light/60 mt-2">
              {t("footer.made_by")}{" "}
              <a
                href="https://myagentwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white dark:hover:text-light transition-colors"
              >
                {t("footer.developer")}
              </a>
            </p>
          </div>
          <div className="flex mt-4 space-x-1 sm:justify-center sm:mt-0">
            {socialItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-md text-white dark:text-light hover:bg-white/10 dark:hover:bg-light/10 transition-colors"
                aria-label={item.title}
              >
                <FontAwesomeIcon
                  icon={item.icon as IconProp}
                  className="text-xl"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
