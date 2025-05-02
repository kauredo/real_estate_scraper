import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";
import HouseTrees from "../components/svgs/HouseTrees";
import HouseLens from "../components/svgs/HouseLens";

const ServicesPage = () => {
  const { t } = useTranslation();

  useMetaTags({
    title: t("services.header"),
    description: t("services.meta_description"),
    url: window.location.href,
  });

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("services.header")} />
      <div className="container mx-auto mb-12 px-8">
        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <p className="mx-auto tablet:text-center mt-2 text-xl text-dark dark:text-light sm:text-2xl">
            {t("services.text.top")}
          </p>
          <p className="mx-auto tablet:text-center mt-4 text-xl text-gray-500 dark:text-light">
            <span
              dangerouslySetInnerHTML={{ __html: t("services.text.bottom") }}
            />
            <Link
              to="/contact"
              className="text-beige-default dark:text-beige-medium underline"
            >
              {t("services.text.link")}
            </Link>
          </p>
        </div>

        {/* Existing Service Cards */}
        <section className="pt-6 text-black dark:text-light">
          <div className="items-center flex flex-wrap h-min py-6 lg:min-h-[20rem]">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4 py-8">
              <HouseTrees />
            </div>
            <div className="w-full md:w-1/2 lg:w-5/12 ml-auto mr-auto">
              <div className="lg:pr-8">
                <h3 className="text-3xl">
                  {t("services.list.house_trees.title")}
                </h3>
                <p
                  className="mt-4 text-lg leading-relaxed text-blueGray-500"
                  dangerouslySetInnerHTML={{
                    __html: t("services.list.house_trees.description"),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="items-center flex md:flex-row flex-col-reverse flex-wrap h-min py-6 lg:min-h-[20rem] bg-white dark:bg-dark">
            <div className="w-full md:w-1/2 lg:w-5/12 ml-auto mr-auto">
              <div className="lg:pl-8">
                <h3 className="text-3xl">
                  {t("services.list.house_lens.title")}
                </h3>
                <p
                  className="mt-4 text-lg leading-relaxed text-blueGray-500"
                  dangerouslySetInnerHTML={{
                    __html: t("services.list.house_lens.description"),
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4 py-8">
              <HouseLens />
            </div>
          </div>
        </section>

        {/* Tailor House Section */}
        <section className="pt-10 mt-6 text-black dark:text-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center">
              {t("services.tailor_house.title")}
            </h2>
            <p
              className="mt-4 text-xl leading-relaxed text-gray-600 text-center mx-auto"
              dangerouslySetInnerHTML={{
                __html: t("services.tailor_house.subtitle"),
              }}
            />
            <p
              className="mt-4 text-lg leading-relaxed text-blueGray-500 mx-auto"
              dangerouslySetInnerHTML={{
                __html: t("services.tailor_house.description"),
              }}
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto pt-10 mt-6 flex justify-between flex-wrap text-black dark:text-light">
          {/* For Sellers Column */}
          <div className="w-full md:w-1/2 sm:pr-6 sm:pl-6 lg:pl-8">
            <h2 className="text-4xl font-bold text-center">
              {t("services.for_sellers.title")}
            </h2>
            <p
              className="mt-4 text-xl leading-relaxed text-gray-600 text-center mx-auto"
              dangerouslySetInnerHTML={{
                __html: t("services.for_sellers.subtitle"),
              }}
            />
            {Object.entries(
              t("services.for_sellers.list", { returnObjects: true })
            ).map(([key, service]: [string, any]) => (
              <div className="mt-6" key={key}>
                <h3 className="text-2xl font-semibold">{service.title}:</h3>
                <p
                  className="mt-2 text-lg leading-relaxed text-blueGray-500"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            ))}
          </div>

          {/* For Buyers Column */}
          <div className="w-full md:w-1/2 sm:pl-6 sm:pr-6 lg:pr-8 pt-10 md:pt-0 text-black dark:text-light">
            <h2 className="text-4xl font-bold text-center">
              {t("services.for_buyers.title")}
            </h2>
            <p
              className="mt-4 text-xl leading-relaxed text-gray-600 text-center mx-auto"
              dangerouslySetInnerHTML={{
                __html: t("services.for_buyers.subtitle"),
              }}
            />
            {Object.entries(
              t("services.for_buyers.list", { returnObjects: true })
            ).map(([key, service]: [string, any]) => (
              <div className="mt-6" key={key}>
                <h3 className="text-2xl font-semibold">{service.title}:</h3>
                <p
                  className="mt-2 text-lg leading-relaxed text-blueGray-500"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
