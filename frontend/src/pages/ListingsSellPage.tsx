import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMetaTags } from "../hooks/useMetaTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchDollar,
  faStar,
  faBalanceScale,
  faCamera,
  faProjectDiagram,
  faCommentDollar,
  faMailBulk,
  faHashtag,
  faBullhorn,
  faHome,
  faBookOpen,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/shared/Banner";

// Add TypeScript interface for the Casafari widget
declare global {
  interface Window {
    initializeCasafariWidget?: (config: {
      key: string;
      startingPage: string;
      showStartingPage: boolean;
      operationType: string;
      lang: string;
    }) => void;
  }
}

const ListingsSellPage = () => {
  const { t, i18n } = useTranslation();

  useMetaTags({
    title: t("sell.header"),
    description: t("sell.meta_description"),
  });

  useEffect(() => {
    // Load Casafari widget script
    const script = document.createElement("script");
    script.src = "https://www.casafari.com/valuation-widget/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.initializeCasafariWidget) {
      window.initializeCasafariWidget({
        key: "D9557C7E502424960F866EE4286B",
        startingPage: "2",
        showStartingPage: false,
        operationType: "",
        lang: i18n.language,
      });
    }
  }, [i18n.language]);

  const sellFeatures = [
    { icon: faSearchDollar, text: t("sell.list.market") },
    { icon: faStar, text: t("sell.list.eval") },
    { icon: faBalanceScale, text: t("sell.list.warranty") },
    { icon: faCamera, text: t("sell.list.media") },
    { icon: faProjectDiagram, text: t("sell.list.kw") },
    { icon: faCommentDollar, text: t("sell.list.agencies") },
    { icon: faMailBulk, text: t("sell.list.portal") },
    { icon: faHashtag, text: t("sell.list.socials") },
    { icon: faBullhorn, text: t("sell.list.promo") },
    { icon: faHome, text: t("sell.list.open") },
    { icon: faBookOpen, text: t("sell.list.flyer") },
    { icon: faHandshake, text: t("sell.list.feedback") },
  ];

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("sell.header")} />

      <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1 className="relative block md:hidden mt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4">
            {t("sell.header")}
          </h1>
        </div>
      </div>

      <section className="container mx-auto mt-6 mb-12 px-2 sm:px-8">
        <div className="py-8 md:py-0 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="px-2 sm:px-0 lg:text-center">
              <p className="mt-2 text-3xl text-dark dark:text-light sm:text-4xl">
                {t("sell.subheader")}
              </p>
            </div>

            <div className="px-2 sm:px-0">
              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.top")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.middle")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.bottom")}
                </p>
              </div>

              <div className="my-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {sellFeatures.map((feature, index) => (
                    <div key={index}>
                      <dt className="flex items-center">
                        <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                          <FontAwesomeIcon icon={feature.icon} />
                        </div>
                        <p className="ml-4 text-lg font-medium text-dark dark:text-light w-3/4">
                          {feature.text}
                        </p>
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.exclusive")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingsSellPage;
