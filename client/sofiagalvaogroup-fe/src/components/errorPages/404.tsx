import { i18n } from "../../languages/languages";
import { HashLink } from "react-router-hash-link";
import mainLogo from "../../assets/logos/main.webp";
import SVG_404 from "../svgs/404";

export default function NotFound() {
  return (
    <div className="flex-auto bg-white flex items-center p-5 lg:p-20 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <img
              loading="lazy"
              src={mainLogo}
              alt="SGG logo"
              className="w-48"
            />
          </div>
          <div className="mb-10 md:mb-20 text-gray-600 font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-beige mb-10">
              {i18n.t("errors.404.title")}
            </h1>
            <p>{i18n.t("errors.404.text_1")}</p>
            <p>{i18n.t("errors.404.text_2")}</p>
          </div>
          <div className="mb-20 md:mb-0">
            <HashLink
              to="/"
              className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-beige hover:brightness-50"
            >
              <i className="mdi mdi-arrow-left mr-2"></i>
              {i18n.t("errors.404.button")}
            </HashLink>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <SVG_404 />
        </div>
      </div>
    </div>
  );
}
