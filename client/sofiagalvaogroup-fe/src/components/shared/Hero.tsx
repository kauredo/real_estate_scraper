import { i18n } from "../../languages/languages";
import { sanitizeURL } from "../utils/Functions";
import QuarterCircle from "./QuarterCircle";
import { HashLink } from "react-router-hash-link";
import mainLogo from "../../assets/logos/main.webp";

interface Props {
  photos: string[];
}

function Hero(props: Props) {
  const { photos } = props;

  return (
    <section className="max-height">
      <div className="center-hero p-12 md:p-0 gap-4">
        <QuarterCircle photos={photos} />
        <div className="w-full md:w-min h-fit md:h-80 md:px-12 flex flex-col justify-center md:justify-end gap-4 md:gap-10">
          <img
            loading="lazy"
            className="h-auto md:h-1/3 w-1/2"
            src={mainLogo}
            alt="Sofia Galvão Group Logo"
          />
          <h1
            className={`text-4xl md:text-7xl ${
              i18n.locale === "pt" ? "whitespace-nowrap" : ""
            }`}
          >
            {i18n.t("home.slogan.top")}
            <br />
            {i18n.t("home.slogan.bottom")}
          </h1>
        </div>
      </div>
      <div className="relative bottom-5 left-0 right-0 center">
        <div className="flex justify-center">
          <HashLink to={sanitizeURL("/buy")}>
            <div className="px-5 lowercase">
              <p>{i18n.t("navbar.buy")}</p>
            </div>
          </HashLink>
          <HashLink to={sanitizeURL("/sell")}>
            <div className="px-5 lowercase">
              <p>{i18n.t("navbar.sell")}</p>
            </div>
          </HashLink>
          <HashLink to="#cards">
            <div className="px-5">
              <i className="fas fa-arrow-down"></i>
            </div>
          </HashLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;
