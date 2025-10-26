import { useTranslation } from "react-i18next";
import MetaTags from "../components/shared/MetaTags";
import Banner from "../components/shared/Banner";
import Profile from "../components/homePage/Profile";
import Results from "../components/homePage/Results";
import FullPageLoader from "../components/loading/FullPageLoader";
import { getHomePage } from "../services/api";
import { ResultNumbers, Testimonial } from "../utils/interfaces";
import { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import { useDelayedLoading } from "../hooks/useDelayedLoading";

const AboutPage = () => {
  const { t } = useTranslation();
  const { showError } = useNotifications();
  const [results, setResults] = useState<ResultNumbers | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showLoading = useDelayedLoading(isLoading);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await getHomePage();
        const data = response.data;

        if (data.stats) {
          setResults(data.stats as ResultNumbers);
        }

        if (data.testimonials) {
          setTestimonials(data.testimonials as Testimonial[]);
        }

        setIsLoading(false);
      } catch (err) {
        showError(t("errors.fetch_about_data"));
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Show loading state
  if (showLoading) {
    return <FullPageLoader />;
  }

  // If no results data yet, show content without results section
  if (!results) {
    return (
      <>
        <MetaTags
          pageType="about"
          title={t("about.header")}
          description={t("about.meta_description")}
          url={window.location.href}
        />
        <Banner height="20vh" blurred={true} text={t("about.header")} />
        <section className="container mx-auto mt-6 mb-12 px-8">
          <Profile />
        </section>
      </>
    );
  }

  return (
    <>
      <MetaTags
        pageType="about"
        title={t("about.header")}
        description={t("about.meta_description")}
        url={window.location.href}
      />
      <Banner height="20vh" blurred={true} text={t("about.header")} />
      <section className="container mx-auto mt-6 mb-12 px-8">
        <Profile />

        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <h3 className="text-2xl text-black dark:text-light">
                {t("about.history_and_values.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.first_paragraph")}
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.second_paragraph")}
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.third_paragraph")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.mission_and_vision.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.mission_and_vision.content")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.team.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.team.content")}
              </p>
            </div>
          </div>
        </div>

        <div className="py-8 md:pb-0 mt-8 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl text-center">
              {t("about.kw_luxury.title")}
            </h2>
            <h3 className="mt-8 text-2xl text-black dark:text-light">
              {t("about.kw_luxury.subtitle")}
            </h3>
            <p className="mt-4 text-lg text-gray-500 dark:text-light">
              {t("about.kw_luxury.content")}
            </p>
          </div>
        </div>

        <div className="py-8 md:pb-0 mt-8 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl text-center">
              {t("about.kw_partnership.title")}
            </h2>

            <div className="mt-8">
              <h3 className="text-2xl text-black dark:text-light">
                {t("about.kw_partnership.international_network.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.kw_partnership.international_network.content")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.kw_partnership.national_network.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.kw_partnership.national_network.content")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.kw_partnership.principles.title")}
              </h3>
              <ul className="list-disc pl-8 mt-4 text-black dark:text-light">
                {Object.entries(
                  t("about.kw_partnership.principles.list", {
                    returnObjects: true,
                  }),
                ).map(([_, object]) =>
                  Object.entries(object).map(([key, value]) => (
                    <li
                      key={key}
                      className="text-lg text-gray-500 dark:text-light"
                    >
                      {String(key)}: {String(value)}
                    </li>
                  )),
                )}
              </ul>
            </div>
          </div>
        </div>

        <Results results={results} testimonials={testimonials} />
      </section>
    </>
  );
};

export default AboutPage;
