import { Button } from "@/components/ui/Button";
import QuarterCircle from "@/components/ui/QuarterCircle";
import Routes from "@/utils/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <Button variant="link" className="px-5 lowercase">
              {t("navbar.buy")}
            </Button>
          </Link>
          <Link to={Routes.sell_path}>
            <Button variant="link" className="px-5 lowercase">
              {t("navbar.sell")}
            </Button>
          </Link>
          <a href="#cards">
            <Button variant="link" className="px-5">
              <FontAwesomeIcon icon="arrow-down" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
