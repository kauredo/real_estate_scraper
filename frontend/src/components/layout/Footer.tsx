import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Routes from "@/utils/routes";
import mainWhiteLogo from "@/assets/logos/main_white.webp";
import { Button } from "@/components/ui/Button";

export default function Footer() {
  const { t } = useTranslation();
  const items = [
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

  return (
    <footer className="bg-beige-default dark:bg-beige-medium p-4 sm:p-12 mt-12">
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
              alt="Sofia Galvão Group Alternative Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-light">
            <li>
              <a href={Routes.about_path}>
                <Button variant="link" className="text-white dark:text-light">
                  {t("footer.about")}
                </Button>
              </a>
            </li>
            <li>
              <a href={Routes.privacy_path}>
                <Button variant="link" className="text-white dark:text-light">
                  {t("footer.privacy")}
                </Button>
              </a>
            </li>
            <li>
              <a href={Routes.terms_and_conditions_path}>
                <Button variant="link" className="text-white dark:text-light">
                  {t("footer.terms")}
                </Button>
              </a>
            </li>
            <li>
              <a href={Routes.contact_path}>
                <Button variant="link" className="text-white dark:text-light">
                  {t("footer.contacts")}
                </Button>
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white dark:border-light sm:mx-auto lg:my-8" />
        <div className="sm:flex justify-between tablet:justify-start items-center ">
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
            <p className="text-xs text-white dark:text-light opacity-60 mt-2">
              {t("footer.made_by")}{" "}
              <a
                href="https://myagentwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:opacity-100"
              >
                {t("footer.developer")}
              </a>
            </p>
          </div>
          <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
            {items?.map((item) => {
              return (
                <a
                  key={`${item.title}--desktop`}
                  href={item.url}
                  className="text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white dark:text-light"
                  >
                    <FontAwesomeIcon icon={item.icon as IconProp} />
                  </Button>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
