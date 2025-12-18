import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

interface Props {
  small?: boolean;
}

export default function Socials(props: Props) {
  const { small } = props;
  const { t } = useTranslation();

  const mainDivClasses = `flex ${
    small
      ? "gap-2 items-center justify-end basis-100 p-2 pt-0 tablet:pt-2 text-2xl tablet:text-lg"
      : "mx-6 mb-8 mt-4 md:mt-0 flex-col"
  }`;

  const iconClasses = `flex items-center text-gray-600 dark:text-light ${
    small ? "hover:text-beige-default dark:hover:text-beige-medium" : "mb-4"
  }`;

  return (
    <div className={mainDivClasses}>
      <a
        href="https://www.linkedin.com/in/sofia-galv%C3%A3o-a141621/"
        target="_blank"
        rel="noopener noreferrer"
        title="Linkedin Sofia Galvão"
      >
        <div className={iconClasses}>
          <FontAwesomeIcon icon={faLinkedin as IconProp} />
          {!small ? (
            <span className="px-2 text-sm">{t("socials.linkedin")}</span>
          ) : null}
        </div>
      </a>
      <a
        href="https://www.instagram.com/sofiagalvaogroupkw/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram Sofia Galvão"
      >
        <div className={iconClasses}>
          <FontAwesomeIcon icon={faInstagram as IconProp} />
          {!small ? (
            <span className="px-2 text-sm">{t("socials.instagram")}</span>
          ) : null}
        </div>
      </a>
      <a
        href="https://www.facebook.com/sofiagalvaokw"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook Sofia Galvão"
      >
        <div className={iconClasses}>
          <FontAwesomeIcon icon={faFacebook as IconProp} />
          {!small ? (
            <span className="px-2 text-sm">{t("socials.facebook")}</span>
          ) : null}
        </div>
      </a>
      <a
        href="https://wa.me/351932829084"
        target="_blank"
        rel="noopener noreferrer"
        title="Whatsapp Sofia Galvão"
      >
        <div className={iconClasses}>
          <FontAwesomeIcon icon={faWhatsapp as IconProp} />
          {!small ? (
            <span className="px-2 text-sm">{t("socials.whatsapp")}</span>
          ) : null}
        </div>
      </a>
    </div>
  );
}
