import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuarterCircle from "./QuarterCircle";
import Routes from "../../utils/routes";

interface Props {
  photos: string[];
}

function Hero(props: Props) {
  const { t } = useTranslation();
  const { photos } = props;

  const title = t("home.slogan.middle").includes("home.slogan.middle") ? (
    <>
      {t("home.slogan.top")}
      <br />
      {t("home.slogan.bottom")}
    </>
  ) : (
    <>
      {t("home.slogan.top")}
      <br />
      {t("home.slogan.middle")}
      <br />
      {t("home.slogan.bottom")}
    </>
  );

  return (
    <section className="max-height">
      <div className="center-hero p-12 md:p-0 gap-4">
        <QuarterCircle photos={photos} />
        <div className="w-full md:w-min h-fit md:px-12 flex flex-col justify-center md:justify-end gap-4 md:gap-10">
          <h1
            className={
              "text-dark dark:text-light text-4xl md:text-7xl whitespace-nowrap"
            }
          >
            {title}
          </h1>
        </div>
      </div>
      <div className="relative bottom-5 left-0 right-0 center">
        <div className="flex justify-center">
          <Link to={Routes.buy_path}>
            <div className="px-5 lowercase">
              <p className="text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
                {t("navbar.buy")}
              </p>
            </div>
          </Link>
          <Link to={Routes.sell_path}>
            <div className="px-5 lowercase">
              <p className="text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
                {t("navbar.sell")}
              </p>
            </div>
          </Link>
          <a href="#cards">
            <div className="px-5 text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
              <FontAwesomeIcon icon="arrow-down" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
