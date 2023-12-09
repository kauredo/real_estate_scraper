import { i18n } from "../../languages/languages";
import { HashLink } from "react-router-hash-link";
import Banner from "../shared/Banner";
import HouseTrees from "../svgs/HouseTrees";
import HouseLens from "../svgs/HouseLens";
import DOMPurify from "dompurify";

export default function Services() {
  const meta_title = i18n.t("services.header");
  const meta_description = i18n.t("services.meta_description");

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>

      <div className="container mx-auto mb-12 px-8">
        <div className="pt-6 bg-white text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden mt-2 text-3xl text-black sm:text-4xl px-4"
            >
              {meta_title}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <p className="mx-auto tablet:text-center mt-2 text-xl text-black sm:text-2xl">
            {i18n.t("services.text.top")}
          </p>
          <p className="mx-auto tablet:text-center mt-4 text-xl text-gray-500">
            {i18n.t("services.text.bottom") + " "}
            <HashLink to={"contact"} className="text-beige underline">
              {i18n.t("services.text.link")}
            </HashLink>
          </p>
        </div>
        <section className="pt-6">
          <div className="items-center flex flex-wrap h-min py-6 lg:min-h-[20rem]">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4 py-8">
              <HouseTrees />
            </div>
            <div className="w-full md:w-1/2 lg:w-5/12 ml-auto mr-auto px-4">
              <div className="lg:pr-12">
                <h3 className="text-3xl ">
                  {i18n.t("services.list.house_trees.title")}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  {i18n.t("services.list.house_trees.description")}
                </p>
              </div>
            </div>
          </div>
          <div className="items-center flex md:flex-row flex-col-reverse flex-wrap h-min py-6 lg:min-h-[20rem] bg-white">
            <div className="w-full md:w-1/2 lg:w-5/12 ml-auto mr-auto px-4">
              <div className="lg:pl-12">
                <h3 className="text-3xl ">
                  {i18n.t("services.list.house_lens.title")}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  {i18n.t("services.list.house_lens.description")}
                </p>
              </div>
            </div>
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4 py-8">
              <HouseLens />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
