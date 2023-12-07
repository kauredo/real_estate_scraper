import { i18n } from "../../languages/languages";
import Banner from "../shared/Banner";

export default function House360() {
  const meta_title = i18n.t("house_360.header");
  const meta_description = i18n.t("house_360.meta_description");

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>
      <div className="container mx-auto mt-6 mb-12 px-8">
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
        <div className="py-8 md:py-0 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("house_360.sub1")}
            </p>
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("house_360.sub2")}
            </p>
            <div className="my-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-plug" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.energy")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i
                        className="fas fa-drafting-compass"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.architecture")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-hard-hat" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.construction")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-hammer" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.remodel")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-broom" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.cleaning")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-truck-moving" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.transport")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-leaf" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.gardening")}
                    </p>
                  </dt>
                </div>
                <div>
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-couch" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lg font-medium text-black w-3/4">
                      {i18n.t("house_360.list.design")}
                    </p>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
