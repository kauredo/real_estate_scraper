import { i18n } from "../../languages/languages";
import Banner from "../shared/Banner";
import WI4C2TES from "../../assets/images/WI4C2TES.webp";

export default function KW() {
  const meta_title = i18n.t("kw.header");
  const meta_description = i18n.t("kw.meta_description");

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>
      <section className="container mx-auto pt-6 px-8">
        <div className="pt-6 bg-white text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden pt-2 text-3xl text-black sm:text-4xl px-4"
            >
              {meta_title}
            </h1>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              {i18n.t("kw.subheader")}
            </h2>
            <img
              loading="lazy"
              className="w-full tablet:w-1/2"
              src="https://marcas-logos.net/wp-content/uploads/2020/03/KELLER-WILLIAMS-LOGO.png"
              alt="KW Portugal Logo"
            />
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("kw.first_paragraph.top")}
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("kw.first_paragraph.middle")}
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("kw.first_paragraph.bottom")}
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              {i18n.t("kw.beliefs.title")}
            </h2>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                {i18n.t("kw.beliefs.local")}
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                {i18n.t("kw.beliefs.partners")}
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                {i18n.t("kw.beliefs.people")}
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                {i18n.t("kw.beliefs.profit")}
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                {i18n.t("kw.beliefs.reputation")}
              </li>
            </ul>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              {i18n.t("kw.principle")}
            </h2>
            <img loading="lazy" src={WI4C2TES} alt="WI4C2TES" />
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              {i18n.t("kw.perspectives.title")}
            </h2>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.tech")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.agent")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.learn")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.brand")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.consulting")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.growth")}</q>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <q>{i18n.t("kw.perspectives.people")}</q>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-6 text-xl text-black sm:text-2xl">
              <a
                className="text-beige underline"
                href="https://www.kwportugal.pt/about"
                target="_blank"
              ></a>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
