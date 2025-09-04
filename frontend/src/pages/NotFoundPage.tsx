import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MetaTags } from "../components/shared/MetaTags";
import mainWhiteLogo from "../assets/logos/main_white.webp";
import mainLogo from "../assets/logos/main.webp";
import NotFound from "../components/svgs/NotFound";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-auto bg-white dark:bg-dark flex items-center p-5 lg:p-20 overflow-hidden relative">
      <MetaTags pageType="error" url={window.location.href} />
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white dark:bg-dark shadow-xl p-10 lg:p-20 text-dark dark:text-light relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <img
              loading="lazy"
              src={mainLogo}
              alt="SGG logo"
              className="w-48 dark:hidden"
            />
            <img
              loading="lazy"
              src={mainWhiteLogo}
              alt="SGG logo"
              className="w-48 hidden dark:block"
            />
          </div>
          <div className="mb-10 md:mb-20 text-gray-600 dark:text-light font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-beige-default dark:text-beige-medium mb-10">
              {t("errors.404.title")}
            </h1>
            <p>{t("errors.404.text_1")}</p>
            <p>{t("errors.404.text_2")}</p>
          </div>
          <div className="mb-20 md:mb-0">
            <Link
              to="/"
              className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-beige-default dark:text-beige-medium hover:brightness-50 dark:hover:text-light dark:hover:brightness-100"
            >
              <FontAwesomeIcon icon="arrow-left" className="mr-2" />
              {t("errors.404.button")}
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <NotFound />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
